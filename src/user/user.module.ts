import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './entities/user.entity'
import { jwtModule } from 'config/jwtModule'

@Module({
  imports: [TypeOrmModule.forFeature([User]), jwtModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
