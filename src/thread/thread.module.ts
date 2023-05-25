import { Module } from '@nestjs/common'
import { ThreadService } from './thread.service'
import { ThreadController } from './thread.controller'
import { jwtModule } from 'config/jwtModule'
import { Thread } from './entities/thread.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { threadMulterModule } from 'config/diskStorage'
@Module({
  imports: [TypeOrmModule.forFeature([Thread]), jwtModule, threadMulterModule],
  controllers: [ThreadController],
  providers: [ThreadService],
})
export class ThreadModule {}
