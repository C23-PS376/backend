import {
  Controller,
  Post,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common'
import { LikeThreadsService } from './thread-like.service'
import { AuthGuard } from 'src/auth/auth.guard'

@UseGuards(AuthGuard)
@Controller('threads/:id/likes')
export class LikeThreadsController {
  constructor(private readonly likeThreadsService: LikeThreadsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Request() req, @Param('id') id: string) {
    return {
      statusCode: 201,
      data: {
        thread_id: (await this.likeThreadsService.create(+id, req?.user?.id))
          .thread,
      },
    }
  }

  @Delete()
  @HttpCode(204)
  async remove(@Request() req, @Param('id') id: string) {
    await this.likeThreadsService.remove(+id, req?.user?.id)
  }
}
