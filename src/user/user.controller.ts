import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ForbiddenException,
  HttpCode,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UploadedFiles
} from '@nestjs/common'

import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { User } from './entities/user.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image' }, { name: 'audio' }]),
  )
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; audio?: Express.Multer.File[] },
  ) {
    if (+id !== req?.user?.id) throw new ForbiddenException()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, threads_count, comments_count, ...data } = await this.userService.update(
      +id,
      {
        ...updateUserDto,
        image: files?.image?.[0],
        audio: files?.audio?.[0]
      }
    )
    return {
      statusCode: 200,
      data: [data],
    }
  }

  @Get(':id')
  async getProfile(@Param('id') id: string, @Request() req): Promise<User> {
    if (+id !== req?.user?.id) throw new ForbiddenException()
    return this.userService.findOneById(+id);
  }
    
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    if (+id !== req?.user?.id) throw new ForbiddenException()
    await this.userService.remove(+id)
  }
}
