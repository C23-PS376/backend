import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageService } from 'src/storage/storage.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(Comment)
		private readonly commentRepository: Repository<Comment>,
		private readonly storageService: StorageService,
	) {}

	async create(
		createCommentDto: CreateCommentDto,
		userId: string,
		threadId: string,
	): Promise<Comment> {
		const comment= new Comment()
		const { audio, ...createdData } = createCommentDto

		const newAudioPath = audio
			? await this.storageService.save('commment/audio-', audio)
			: undefined

		Object.assign(comment, {
			user: userId,
			thread: threadId,
			audio: newAudioPath,
			...createdData,
		})
		return await this.commentRepository.save(comment)
	}


}
