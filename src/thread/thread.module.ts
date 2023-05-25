import { Module } from '@nestjs/common'
import { ThreadService } from './thread.service'
import { ThreadController } from './thread.controller'
import { jwtModule } from 'config/jwtModule'
import { Thread } from './entities/thread.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { multerModule } from 'config/multer.config'
import { StorageService } from 'src/storage/storage.service'
@Module({
  imports: [TypeOrmModule.forFeature([Thread]), jwtModule, multerModule],
  controllers: [ThreadController],
  providers: [ThreadService, StorageService],
})
export class ThreadModule {}
