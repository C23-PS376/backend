import { Module } from '@nestjs/common'
import { ThreadService } from './thread.service'
import { ThreadController } from './thread.controller'
import { jwtModule } from 'config/jwtModule'
import { Thread } from './entities/thread.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { multerModule } from 'config/multer.config'
import { StorageService } from 'src/storage/storage.service'
import { TopicsService } from 'src/topics/topics.service'
import { Topic } from 'src/topics/entities/topic.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Thread, Topic]), jwtModule, multerModule],
  controllers: [ThreadController],
  providers: [ThreadService, StorageService, TopicsService],
})
export class ThreadModule {}
