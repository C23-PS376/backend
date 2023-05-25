import { Injectable, HttpException, ForbiddenException } from '@nestjs/common'
import { CreateThreadDto } from './dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto'
import { Thread } from './entities/thread.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as fs from 'fs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(Thread)
    private readonly threadRepository: Repository<Thread>,
    private readonly configService: ConfigService,
  ) {}

  async create(
    createUserDto: CreateThreadDto,
    userId: string,
  ): Promise<Thread> {
    const thread = new Thread()
    Object.assign(thread, { user: userId, ...createUserDto })
    return await this.threadRepository.save(thread)
  }

  async findAll() {
    return await this.threadRepository.find()
  }

  async findOneById(id: number): Promise<Thread> {
    const thread = await this.threadRepository.findOneBy({ id })
    console.log(thread)
    if (!thread) throw new HttpException("Thread didn't exists", 400)
    return thread
  }

  async update(
    threadId: number,
    updateThreadDto: UpdateThreadDto,
    userId: number,
  ): Promise<Thread> {
    const existingThread = await this.threadRepository.findOne({
      where: { id: threadId },
      relations: {
        user: true,
      },
    })
    if (!existingThread) throw new HttpException("Thread didn't exists", 400)
    if (existingThread.user.id !== userId) throw new ForbiddenException()

    Object.assign(existingThread, { user: userId, ...updateThreadDto })

    this.removeFileIfExists(
      `${this.configService.get<string>('STORAGE')}/${existingThread.audio}`,
    )
    this.removeFileIfExists(
      `${this.configService.get<string>('STORAGE')}/${existingThread.image}`,
    )
    return await this.threadRepository.save(existingThread)
  }

  async remove(id: number, userId: number) {
    const existingThread = await this.threadRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    })
    if (!existingThread) throw new HttpException("Thread didn't exists", 400)
    if (existingThread.user.id !== userId) throw new ForbiddenException()

    this.removeFileIfExists(
      `${this.configService.get<string>('STORAGE')}/${existingThread.audio}`,
    )
    this.removeFileIfExists(
      `${this.configService.get<string>('STORAGE')}/${existingThread.image}`,
    )

    return this.threadRepository.delete({ id })
  }

  removeFileIfExists(path: string) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(path)) {
        fs.unlink(path, (err) => {
          if (err) reject(err)
          resolve(path)
        })
      }
    })
  }
}
