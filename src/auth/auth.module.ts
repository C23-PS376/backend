import { Module } from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from 'src/user/user.module'
import { jwtModule } from 'config/jwtModule'

@Module({
  imports: [UserModule, jwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
