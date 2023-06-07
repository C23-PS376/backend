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
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('threads/:threadId/comment')
export class CommentController {
	constructor(
		private readonly commentService: CommentService
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
		const comment = await this.commentService.create({
			...createCommentDto,
			audio: files?.audio?.[0],
		},
		req?.user?.id,
		req?.thread?.id,
		)
		const { text, audio } = comment
		return {
			statusCode: 201,
			data: [{ text, audio}],
		}
	}
}
