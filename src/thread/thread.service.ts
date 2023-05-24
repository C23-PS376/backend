import { Injectable } from '@nestjs/common'
import { CreateThreadDto } from './dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto'
import { Thread } from './entities/thread.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(Thread)
    private readonly threadRepository: Repository<Thread>,
  ) {}

  async create(createUserDto: CreateThreadDto, userId: string): Promise<Thread> {
    const thread = new Thread()
    Object.assign(thread, {user: userId, ...createUserDto})
    return await this.threadRepository.save(thread)
  }

  findAll() {
    return `This action returns all thread`
  }

  findOne(id: number) {
    return `This action returns a #${id} thread`
  }

  update(id: number, updateThreadDto: UpdateThreadDto) {
    return `This action updates a #${id} thread`
  }

  remove(id: number) {
    return `This action removes a #${id} thread`
  }
}
