import { Module } from '@nestjs/common'
import { ThreadService } from './thread.service'
import { ThreadController } from './thread.controller'
import { MulterModule } from '@nestjs/platform-express'
import { jwtModule } from 'config/jwtModule'
import { Thread } from './entities/thread.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Thread]), MulterModule, jwtModule],
  controllers: [ThreadController],
  providers: [ThreadService],
})
export class ThreadModule {}
