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


@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(Comment)
		private readonly commentRepository: Repository<Comment>,
		private readonly userService: UserService,
		private readonly threadService: ThreadService,
		private readonly storageService: StorageService,
	) {}

	async create(
		createCommentDto: CreateCommentDto,
		userId: string,
		threadId: string,
	): Promise<Comment> {
		// console.log("hasil: ", createCommentDto);
		const comment= new Comment()
		const { audio, ...createdData } = createCommentDto

		if (!this.threadService.findOneById(+threadId)) throw new HttpException("Thread doesn't exists", 400)

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

		const user = await this.userService.findOneById(+userId)
		const thread = await this.threadService.findOneById(+threadId)
		user.comments_count = (+user.threads_count + 1 ).toString()
		thread.comments_count = (+thread.comments_count + 1 ).toString()

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
			audio_length: comment.audio_length,
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
}
