import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'

import { LoginAuthDto } from './dto/login-auth.dto'
import { RegisterAuthDto } from './dto/register-auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async validate(@Body() loginAuthDto: LoginAuthDto) {
    const accessToken = await this.authService.signIn(loginAuthDto)
    return {
      statusCode: 200,
      data: [accessToken],
    }
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async create(@Body() registerAuthDto: RegisterAuthDto) {
    const accessToken = await this.authService.register(registerAuthDto)
    return {
      statusCode: 201,
      data: [accessToken],
    }
  }

  @UseGuards(AuthGuard)
  @Get('login')
  getProfile(@Request() req) {
    return req.user.id
  }
}
