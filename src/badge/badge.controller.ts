import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createBadgeDto: CreateBadgeDto) {
    return {
      statusCode: 201,
      data: this.badgeService.create(createBadgeDto),
    }
  }

  @Get()
  async findAll() {
    return {
      statusCode: 200,
      data: await this.badgeService.findAll(),
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: 200,
      data: await this.badgeService.findOne(+id),
    }
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBadgeDto: UpdateBadgeDto) {
    return {
      statusCode: 200,
      data: await this.badgeService.update(+id, updateBadgeDto),
    }
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.badgeService.remove(+id);
  }
}
