import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './entities/user.entity'
import { jwtModule } from 'config/jwtModule'
import { StorageService } from 'src/storage/storage.service'
import { multerModule } from 'config/multer.config'
@Module({
  imports: [TypeOrmModule.forFeature([User]), jwtModule, multerModule],
  controllers: [UserController],
  providers: [UserService, StorageService],
  exports: [UserService],
})
export class UserModule {}
