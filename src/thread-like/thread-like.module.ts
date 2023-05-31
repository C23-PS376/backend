import { Module } from '@nestjs/common'
import { LikeThreadsService } from './thread-like.service'
import { LikeThreadsController } from './thread-like.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LikeThread } from './entities/thread-like.entity'
import { jwtModule } from 'config/jwtModule'
import { Thread } from 'src/thread/entities/thread.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeThread]),
    jwtModule,
    TypeOrmModule.forFeature([Thread]),
  ],
  controllers: [LikeThreadsController],
  providers: [LikeThreadsService],
})
export class LikeThreadsModule {}
