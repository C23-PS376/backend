import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
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
import { Topic } from 'src/topics/entities/topic.entity';
import { BadgeService } from 'src/badge/badge.service';
import { Badge } from 'src/badge/entities/badge.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([
    Comment, 
    Thread, 
    Topic,
    User,
    Badge,
  ]), 
    jwtModule, 
    multerModule,
    HttpModule,
  ],

  controllers: [CommentController],
  providers: [
    CommentService,
    StorageService, 
    TopicsService,
    ThreadService, 
    UserService,
    BadgeService,
  ],
})
export class CommentModule {}
