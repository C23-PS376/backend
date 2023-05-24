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
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { fileFilter } from './thread.decorator'
import { diskStorage } from 'multer'

import { AuthGuard } from 'src/auth/auth.guard'
import { ThreadService } from './thread.service'
import { CreateThreadDto } from './dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto'

@Controller('thread')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image' }, { name: 'audio' }], {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
          callback(null, `${randomName}.${file.mimetype.split('/')[1]}`)
        },
      }),
    }),
  )
  async create(
    @Request() req,
    @Body() createThreadDto: CreateThreadDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; audio?: Express.Multer.File[] },
  ) {
    const thread = await this.threadService.create({
      ...createThreadDto,
      image: files.image?.[0]?.filename,
      audio: files.audio?.[0]?.filename,
    }, req?.user?.id)
    const { id, title, description, topic, image, audio } = thread
    return {
      statusCode: 201,
      data: [{ id, title, description, topic, image, audio }],
    }
  }

  @Get()
  findAll() {
    return this.threadService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThreadDto: UpdateThreadDto) {
    return this.threadService.update(+id, updateThreadDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.threadService.remove(+id)
  }
}
