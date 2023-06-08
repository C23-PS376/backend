import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './entities/user.entity'
import { jwtModule } from 'config/jwtModule'
import { StorageService } from 'src/storage/storage.service'
import { multerModule } from 'config/multer.config'
import { BadgeService } from 'src/badge/badge.service'
import { Badge } from 'src/badge/entities/badge.entity'
@Module({
  imports: [TypeOrmModule.forFeature([User, Badge]), jwtModule, multerModule],
  controllers: [UserController],
  providers: [UserService, StorageService, BadgeService],
  exports: [UserService],
})
export class UserModule {}
