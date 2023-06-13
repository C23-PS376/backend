import { Module } from '@nestjs/common';
import { CommentController, CommentUserController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { multerModule } from 'config/multer.config';
import { StorageService } from 'src/storage/storage.service';
import { jwtModule } from 'config/jwtModule';
import { ThreadService } from 'src/thread/thread.service';
import { Thread } from 'src/thread/entities/thread.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { TopicsService } from 'src/topics/topics.service';
import { BadgeService } from 'src/badge/badge.service';
import { Topic } from 'src/topics/entities/topic.entity';
import { Badge } from 'src/badge/entities/badge.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Comment, 
        Thread, 
        User,
        Topic,
        Badge
      ]
    ), 
    jwtModule, 
    multerModule
  ],

  controllers: [CommentController, CommentUserController],
  providers: [
    CommentService,
    StorageService, 
    ThreadService, 
    UserService,
    TopicsService,
    BadgeService,
  ],
})
export class CommentModule {}
