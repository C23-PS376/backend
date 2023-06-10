import {
  Controller, 
  Post, 
  UseGuards, 
  UsePipes,
  Param,
  Request,
  ValidationPipe,
  Delete,
  HttpCode, 
} from '@nestjs/common';
import { LikeCommentsService } from './comment-like.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('threads/:threadId/comments/:id/likes')
export class CommentLikeController {
  constructor(
    private readonly likeCommentsService: LikeCommentsService
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Request() req,
    @Param('threadId') threadId: string,
    @Param('id') id: string,
  ) {
    return {
      statusCode: 201,
      data: {
        thread_id: +threadId,
        comment_id: (await this.likeCommentsService.create(
          +id,
          +threadId,
          req?.user?.id
        )).comment,
      },
    }
  }

  @Delete()
  @HttpCode(204)
  async remove(
    @Request() req,
    @Param('id') id: string,
    @Param('threadId') threadId: string,
  ){
    await this.likeCommentsService.remove(+id, +threadId, req?.user?.id)
  }
}
