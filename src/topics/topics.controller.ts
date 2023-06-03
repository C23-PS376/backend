import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, HttpCode } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async create(@Body() createTopicDto: CreateTopicDto) {
    return {
      statusCode: 201,
      data: await this.topicsService.create(createTopicDto),
    }
  }

  @Get()
  async findAll() {
    return {
      statusCode: 200,
      data: await this.topicsService.findAll(),
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return {
      statusCode: 200,
      data: await this.topicsService.update(+id, updateTopicDto),
    }
  }

  @HttpCode(204)
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    await this.topicsService.remove(+id);
  }
}
