import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Request,
  UseGuards,
  HttpCode,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

import { AuthGuard } from 'src/auth/auth.guard'
import { ThreadService } from './thread.service'
import { CreateThreadDto } from './dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto'

@Controller('threads')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image' }, { name: 'audio' }]),
  )
  async create(
    @Request() req,
    @Body() createThreadDto: CreateThreadDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; audio?: Express.Multer.File[] },
  ) {
    const thread = await this.threadService.create(
      {
        ...createThreadDto,
        image: files?.image?.[0],
        audio: files?.audio?.[0],
      },
      req?.user?.id,
    )
    const { id, title, description, topic, image, audio } = thread
    return {
      statusCode: 201,
      data: [{ id, title, description, topic, image, audio }],
    }
  }

  @Get()
  async findAll() {
    return {
      statusCode: 200,
      data: await this.threadService.findAll(),
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: 200,
      data: await this.threadService.findOneById(+id),
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image' }, { name: 'audio' }]),
  )
  async update(
    @Param('id') id: string,
    @Body() updateThreadDto: UpdateThreadDto,
    @Request() req,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; audio?: Express.Multer.File[] },
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, comments_count, likes_count, created_at, ...data } =
      await this.threadService.update(
        +id,
        {
          ...updateThreadDto,
          image: files?.image?.[0],
          audio: files?.audio?.[0],
        },
        req?.user?.id,
      )

    return {
      statusCode: 200,
      data,
    }
  }

  @HttpCode(204)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.threadService.remove(+id, req?.user?.id)
  }
}
