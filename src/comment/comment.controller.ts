import { 
	Body,
	Controller, 
	Post,
	Param, 
	UsePipes,
	ValidationPipe, 
	UseGuards,
	UseInterceptors,
	Request,
	Get,
	HttpCode,
	Delete,
	UploadedFiles,
	Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ThreadService } from '../thread/thread.service';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('threads/:threadId/comments')
export class CommentController {
	constructor(
		private readonly commentService: CommentService,
		private readonly threadService: ThreadService
	) {}

	@Post()
	@UsePipes(new ValidationPipe())
	@UseGuards(AuthGuard)
	@UseInterceptors(
		FileFieldsInterceptor([{ name: 'audio'}]),
	)
	async create(
		@Request() req,
		@Param('threadId') threadId: string,
		@Body() createCommentDto: CreateCommentDto,
		@UploadedFiles()
		files: { audio?: Express.Multer.File[]},
	) {
		const comment = await this.commentService.create({
			...createCommentDto,
			audio: files?.audio?.[0],
		},
		req?.user?.id,
		threadId,
		)
		return {
			statusCode: 201,
			data:{ 
				id: comment.id,
				threadId: +comment.thread,
				text: comment.text, 
				audio: comment.audio,
				audio_length: Number(comment.audio_length),
				created_at: comment.created_at,
			},
		}
	}

	@Post(':id')
	@UsePipes(new ValidationPipe())
	@UseGuards(AuthGuard)
	@UseInterceptors(
		FileFieldsInterceptor([{ name: 'audio' }]),
	)
	async update(
		@Request() req,
		@Param('threadId') threadId: string,
		@Param('id') id:string,
		@Body() updateCommentDto: UpdateCommentDto,
		@UploadedFiles()
		files: { audio?: Express.Multer.File[]},
	) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { user, thread, created_at, updated_at, ...data } = 
			await this.commentService.update(
				+id,
				+threadId,
				{
					...updateCommentDto,
					audio: files?.audio?.[0],
				},
				req?.user?.id,
			)

		return{
			statusCode: 200,
			data,
		};
	}

	@Get()
	async findAll(
		@Param('threadId') threadId: string,
		@Query('size') size: string,
 	) {
		if(!size) size = '5'
		return {
			statusCode: 200,
			data: await this.commentService.findAll(+threadId, +size),
		}
	}

	@Get(':id')
	async findOne(
		@Param('id') id: string,
		@Param('threadId') threadId: string,
	) {
		return{
			statusCode: 200,
			data: await this.commentService.findOneById(+id, +threadId),
		}
	}

	@HttpCode(204)
	@UseGuards(AuthGuard)
	@Delete(':id')
	async remove(
		@Param('id') id: string,
		@Param('threadId') threadId: string,
		@Request() req,
	){
		await this.commentService.remove(+id, +threadId, req?.user?.id)
	}
}
