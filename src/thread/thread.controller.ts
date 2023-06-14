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
  Query,
  BadRequestException,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

import { AuthGuard } from 'src/auth/auth.guard'
import { ThreadService } from './thread.service'
import { CreateThreadDto } from './dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto'

@Controller('threads')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @HttpCode(200)
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
    const flaggedWords: string[] = [];
    if (createThreadDto.title) {
      const flaggedTitleWords = await this.threadService.checkToxic(createThreadDto.title);
      flaggedWords.push(...flaggedTitleWords);
    }
    if (createThreadDto.description) {
      const flaggedDescriptionWords = await this.threadService.checkToxic(createThreadDto.description);
      flaggedWords.push(...flaggedDescriptionWords);
    }
    if (flaggedWords.length > 0) {
      const message = `Text contains words that are ${flaggedWords.join(', ')}`;
      throw new BadRequestException({ statusCode: 400, message });
    }

    const data = await this.threadService.create(
      {
        ...createThreadDto,
        image: files?.image?.[0],
        audio: files?.audio?.[0],
      },
      req?.user?.id,
    )
    return {
      statusCode: 200,
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        topic: data.topic,
        image: data.image,
        audio: data.audio,
        audio_length: Number(data.audio_length),
        created_at: data.created_at,
      },
    }
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('keyword') keyword: string,
    @Query('topic') topic: number,
  ) {
    if(!page) page = '0'
    if(!size) size = '5'
    return {
      statusCode: 200,
      data: await this.threadService.findAll(page, size, keyword, topic),
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
    const flaggedWords: string[] = [];
    if (updateThreadDto.title) {
      const flaggedTitleWords = await this.threadService.checkToxic(updateThreadDto.title);
      flaggedWords.push(...flaggedTitleWords);
    }
    if (updateThreadDto.description) {
      const flaggedDescriptionWords = await this.threadService.checkToxic(updateThreadDto.description);
      flaggedWords.push(...flaggedDescriptionWords);
    }
    if (flaggedWords.length > 0) {
      const message = `Text contains words that are ${flaggedWords.join(', ')}`;
      throw new BadRequestException({ statusCode: 400, message });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = await this.threadService.update(
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
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        topic: data.topic,
        image: data.image,
        audio: data.audio,
        audio_length: data.audio ? Number(data.audio_length) : undefined,
        updated_at: data.updated_at,
      },
    }
  }

  @HttpCode(204)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.threadService.remove(+id, req?.user?.id)
  }
}
