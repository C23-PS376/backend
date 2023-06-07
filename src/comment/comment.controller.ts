import { 
	Body,
	Controller, 
	Post,
	Param, 
	UploadedFile,
	UsePipes,
	ValidationPipe, 
	UseGuards,
	UseInterceptors,
	Request,
	HttpException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ThreadService } from '../thread/thread.service';

@Controller('threads/:threadId/comment')
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
		@UploadedFile()
		files: { audio?: Express.Multer.File[]},
	) {
		const existingThread = await this.threadService.findOneById(+threadId)

		const comment = await this.commentService.create({
			...createCommentDto,
			audio: files?.audio?.[0],
		},
		req?.user?.id,
		threadId,
		)
		const { id, text, audio } = comment
		return {
			statusCode: 201,
			data: [
				{ 
					id,
					threadId: existingThread.id,
				 	text, 
					audio,
				}
			],
		}
	}
}
