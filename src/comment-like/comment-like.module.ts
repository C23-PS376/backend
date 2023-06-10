import { Module } from '@nestjs/common';
import { LikeCommentsService } from './comment-like.service';
import { CommentLikeController } from './comment-like.controller';

@Module({
  providers: [LikeCommentsService],
  controllers: [CommentLikeController]
})
export class CommentLikeModule {}
