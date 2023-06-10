import { Module } from '@nestjs/common';
import { LikeCommentsService } from './comment-like.service';
import { CommentLikeController } from './comment-like.controller';
import { Comment } from 'src/comment/entities/comment.entity';
import { LikeComment } from './entities/comment-like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from 'src/thread/entities/thread.entity';
import { jwtModule } from 'config/jwtModule';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        LikeComment,
        Comment,
        Thread,
      ]
    ),
    jwtModule
  ],
  providers: [LikeCommentsService],
  controllers: [CommentLikeController]
})
export class CommentLikeModule {}
