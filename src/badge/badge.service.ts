import { HttpException, Injectable } from '@nestjs/common';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Badge } from './entities/badge.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(Badge)
    private readonly badgeRepository: Repository<Badge>,
  ){}

  async create(createBadgeDto: CreateBadgeDto) {
    const newBadge = new Badge()
    Object.assign(newBadge, createBadgeDto)
    return await this.badgeRepository.save(newBadge)
  }

  async findAll() {
    return await this.badgeRepository.find();
  }

  async findOne(id: number) {
    return await this.badgeRepository.findOneBy({ id });
  }

  async update(id: number, updateBadgeDto: UpdateBadgeDto) {
    const existingBadge = await this.findOne(id)
    if (!existingBadge) throw new HttpException("Badge doesn't exists", 400)

    Object.assign(existingBadge, updateBadgeDto)
    return this.badgeRepository.save(existingBadge);
  }

  async remove(id: number) {
    const existingBadge = await this.findOne(id)
    if (!existingBadge) throw new HttpException("Badge doesn't exists", 400)


    return await this.badgeRepository.delete({ id })
  }
}
