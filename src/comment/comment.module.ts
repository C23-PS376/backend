import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { multerModule } from 'config/multer.config';
import { StorageService } from 'src/storage/storage.service';
import { jwtModule } from 'config/jwtModule';
import { ThreadService } from '../thread/thread.service';
import { Thread } from 'src/thread/entities/thread.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Thread]), jwtModule, multerModule],
  controllers: [CommentController],
  providers: [CommentService, StorageService, ThreadService],
})
export class CommentModule {}
