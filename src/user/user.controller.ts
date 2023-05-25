import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ForbiddenException,
  HttpCode,
  UseGuards,
} from '@nestjs/common'

import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from 'src/auth/auth.guard'
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (+id !== req?.user?.id) throw new ForbiddenException()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = await this.userService.update(
      +id,
      updateUserDto,
    )
    return {
      statusCode: 200,
      data: [data],
    }
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    if (+id !== req?.user?.id) throw new ForbiddenException()
    await this.userService.remove(+id)
  }
}
