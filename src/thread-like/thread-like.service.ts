import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LikeThread } from './entities/thread-like.entity'
import { Repository } from 'typeorm'
import { Thread } from 'src/thread/entities/thread.entity'

@Injectable()
export class LikeThreadsService {
  constructor(
    @InjectRepository(LikeThread)
    private readonly likeThreadsRepository: Repository<LikeThread>,
    @InjectRepository(Thread)
    private readonly threadRepository: Repository<Thread>,
  ) {}

  async create(threadId: number, userId: number) {
    const thread = await this.threadRepository.findOneBy({ id: +threadId })
    if (!thread) throw new HttpException("Thread didn't exists", 400)
    if (
      await this.likeThreadsRepository.findOneBy({
        thread: { id: threadId },
        user: { id: userId },
      })
    )
      throw new HttpException('Already liked', 400)

    thread.likes_count = (+thread.likes_count + 1).toString()
    const likeThread = new LikeThread()
    Object.assign(likeThread, { user: userId, thread: +threadId })
    await this.threadRepository.save(thread)
    return await this.likeThreadsRepository.save(likeThread)
  }

  async remove(threadId: number, userId: number) {
    const thread = await this.threadRepository.findOneBy({ id: +threadId })
    if (!thread) throw new HttpException("Thread didn't exists", 400)
    if (
      !(await this.likeThreadsRepository.findOneBy({
        thread: { id: threadId },
        user: { id: userId },
      }))
    )
      throw new HttpException('Not liked yet', 400)

    thread.likes_count = (+thread.likes_count - 1).toString()
    await this.threadRepository.save(thread)
    return await this.likeThreadsRepository.delete({
      thread: { id: threadId },
      user: { id: userId },
    })
  }
}
