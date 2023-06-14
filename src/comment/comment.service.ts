import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageService } from 'src/storage/storage.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserService } from 'src/user/user.service';
import { ThreadService } from 'src/thread/thread.service';
import * as fs from 'fs'
import * as tmp from 'tmp'
import getAudioDurationInSeconds from 'get-audio-duration';
import { Thread } from 'src/thread/entities/thread.entity';
import { User } from 'src/user/entities/user.entity';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(Comment)
		private readonly commentRepository: Repository<Comment>,
		@InjectRepository(Thread)
		private readonly threadRepository: Repository<Thread>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly userService: UserService,
		private readonly threadService: ThreadService,
		private readonly storageService: StorageService,
		private readonly httpService: HttpService,
	) {}

	async create(
		createCommentDto: CreateCommentDto,
		userId: string,
		threadId: string,
	): Promise<Comment> {
		// console.log("hasil: ", createCommentDto);
		const existUser = await this.userService.findOneById(+userId)
		const existThread = await this.threadService.findOneById(+threadId)
		existUser.comments_count = (+existUser.comments_count + 1 ).toString()
		existThread.comments_count = (+existThread.comments_count + 1 ).toString()
		
		if (!existThread) throw new HttpException("Thread doesn't exists", 400)
		if (!existUser) throw new HttpException("User doesn't exists", 400)

		const comment= new Comment()
		const { audio, ...createdData } = createCommentDto

		const newAudioPath = audio
			? await this.storageService.save('comments/audio-', audio)
			: undefined
		const newAudioLength = audio
			? await this.getAudioDuration(audio.buffer)
			: undefined

		Object.assign(comment, {
			user: userId,
			thread: threadId,
			audio: newAudioPath,
			audio_length: newAudioLength,
			...createdData,
		})

		await this.userRepository.save(existUser)
		await this.threadRepository.save(existThread)

		return await this.commentRepository.save(comment)
	}

	async update(
		commentId: number,
		threadId: number,
		updateCommentDto: UpdateCommentDto,
		userId: number,
	): Promise<Comment>{
		const existingComment = await this.commentRepository.findOne({
			where: { 
				id: commentId,
				thread: {id: threadId},
			},
			relations: {
				user: true,
				thread: true,
			},
		})

		if (!existingComment) throw new HttpException("Comment didn't exists", 400)
    if (existingComment.user.id !== userId && existingComment.thread.id !== threadId) throw new ForbiddenException()

		const { audio, ...updatedData } = updateCommentDto
		const oldAudioPath = this.storageService.getFilenameFromPath(
			existingComment.audio,
		)
		const newAudioPath = audio
			? await this.storageService.save('comments/audio-', audio)
			: undefined

		Object.assign(existingComment, {
			user: userId,
			thread: threadId,
			audio: newAudioPath,
			...updatedData,
		})

		if (audio) this.storageService.removeFileIfExists(oldAudioPath)
		return await this.commentRepository.save(existingComment)
	}

	async remove(
		id: number,
		threadId: number,
		userId: number,
	){
		const existingComment = await this.commentRepository.findOne({
			where: {
				id,
				thread: {id: threadId},
			},
			relations: {
				user: true,
			},
		})
		if(!existingComment) throw new HttpException("Comment didn't exists", 400)
		if(existingComment.user.id !== userId) throw new ForbiddenException()

		const oldAudioPath = this.storageService.getFilenameFromPath(
			existingComment.audio,
		)

		this.storageService.removeFileIfExists(oldAudioPath)
		return this.commentRepository.delete({ id });
	}

	async findOneById(
		commentId: number,
		threadId: number,
	): Promise<Comment>{
		const comment = await this.commentRepository.findOne({
			where: {
				id: +commentId,
				thread: {id: threadId},
			},
			select: {
				user: {
					name: true,
				},
				thread: {
					id: true,
				}
			}
		})
		if(!comment) throw new HttpException("Comment doesn't exists", 400)
		return comment
	}

	async findAll(
		threadId: number,
		size: number,
		page: number,
	) {
		const comments = await this.commentRepository.find(
			{
				where: {
					thread: {id: threadId}
				},
				order: {
					created_at: 'DESC'
				},
				skip: page,
				take: size,
				relations:[
					'user',
				]
			}
		);

		const data = comments.map(comment => ({
			id: comment.id,
			text: comment.text,
			audio: comment.audio,
			audio_length: +comment.audio_length,
			created_at: comment.created_at,
			updated_at: comment.updated_at,
			username: comment.user.name,
		}));

		return data
	}

	async findAllByUserId(
		userId: number,
		size: number,
		page: number,
		) {
		const comments = await this.commentRepository.find(
			{
				where: {
					user: {id: userId}
				},
				order: {
					created_at: 'DESC'
				},
				skip: page,
				take: size,
				relations: [
					'user',
					'thread'
				]
			}
		)

		const data = comments.map(comment => ({
			id: comment.id,
			text: comment.text,
			audio: comment.audio,
			audio_length: +comment.audio_length,
			created_at: comment.created_at,
			updated_at: comment.updated_at,
			thread_id: comment.thread.id,
		}));

		return data

	}

	getAudioDuration(audioBuffer: Buffer) {
		return new Promise((resolve, reject) => {
			tmp.file(function(err, path, fd, cleanup){
				if(err)throw err
				fs.appendFile(path, audioBuffer, function(err){
					if(err) reject(err)
					getAudioDurationInSeconds(path).then((duration) => {
						cleanup()
						resolve(duration)
					})
				})
			})
		})
	}

	async checkToxic(text: string) {
		const url = 'https://mlapi-dzjerbarfq-uc.a.run.app/predict_text'
		// const url = 'http://127.0.0.1:8081/predict_text'
		const payload = JSON.stringify({ text });
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await this.httpService.post(url, payload, config).toPromise();
			const flaggedWords = response.data;

      let flaggedTrueWords: string[] = []
      flaggedTrueWords = Object.keys(flaggedWords)
        .filter(key => flaggedWords[key] === true);
      return flaggedTrueWords;
    } catch (error) {
      console.error(error);
    }
	}
}
