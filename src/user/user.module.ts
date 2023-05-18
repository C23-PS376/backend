import { Module, UseGuards } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './entities/user.entity'
import { AuthGuard } from 'src/auth/auth.guard'
import { jwtModule } from 'config/jwtModule'

@UseGuards(AuthGuard)
@Module({
  imports: [TypeOrmModule.forFeature([User]), jwtModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
