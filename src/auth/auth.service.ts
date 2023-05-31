import {
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from 'src/user/user.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { RegisterAuthDto } from './dto/register-auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto
    const user = await this.usersService.validate(email, password)
    if (!user) throw new UnauthorizedException()

    const payload = { id: user.id }
    return {
      id: user.id,
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const user = await this.usersService.create(registerAuthDto)
    if (!user) throw new HttpException('User gagal ditambahkan', 500)

    const payload = { id: user.id }
    return {
      id: user.id,
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
