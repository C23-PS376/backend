import { Injectable, HttpException, ForbiddenException } from '@nestjs/common'
import { CreateThreadDto } from './dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto'
import { Thread } from './entities/thread.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { StorageService } from 'src/storage/storage.service'

@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(Thread)
    private readonly threadRepository: Repository<Thread>,
    private readonly storageService: StorageService,
  ) {}

  async create(
    createUserDto: CreateThreadDto,
    userId: string,
  ): Promise<Thread> {
    const thread = new Thread()
    const { audio, image, ...createdData } = createUserDto

    const newImagePath = image
      ? await this.storageService.save('threads/image-', image)
      : undefined
    const newAudioPath = audio
      ? await this.storageService.save('threads/audio-', audio)
      : undefined

    Object.assign(thread, {
      user: userId,
      image: newImagePath,
      audio: newAudioPath,
      ...createdData,
    })
    return await this.threadRepository.save(thread)
  }

  async findAll() {
    return await this.threadRepository.find()
  }

  async findOneById(id: number): Promise<Thread> {
    const thread = await this.threadRepository.findOneBy({ id })
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

    const { audio, image, ...updatedData } = updateThreadDto
    const oldImagePath = this.storageService.getFilenameFromPath(
      existingThread.image,
    )
    const oldAudioPath = this.storageService.getFilenameFromPath(
      existingThread.audio,
    )

    const newImagePath = image
      ? await this.storageService.save('threads/image-', image)
      : undefined
    const newAudioPath = audio
      ? await this.storageService.save('threads/audio-', audio)
      : undefined

    Object.assign(existingThread, {
      user: userId,
      image: newImagePath,
      audio: newAudioPath,
      ...updatedData,
    })

    if (image) this.storageService.removeFileIfExists(oldImagePath)
    if (audio) this.storageService.removeFileIfExists(oldAudioPath)

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

    const oldImagePath = this.storageService.getFilenameFromPath(
      existingThread.image,
    )
    const oldAudioPath = this.storageService.getFilenameFromPath(
      existingThread.audio,
    )

    this.storageService.removeFileIfExists(oldImagePath)
    this.storageService.removeFileIfExists(oldAudioPath)

    return this.threadRepository.delete({ id })
  }
}
