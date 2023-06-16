import { Injectable, HttpException, ForbiddenException } from '@nestjs/common'
import { CreateThreadDto } from './dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto'
import { Thread } from './entities/thread.entity'
import { ILike, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { StorageService } from 'src/storage/storage.service'
import getAudioDurationInSeconds from 'get-audio-duration'
import * as fs from 'fs'
import * as tmp from 'tmp'
import { TopicsService } from 'src/topics/topics.service'
import { UserService } from 'src/user/user.service'
import { User } from 'src/user/entities/user.entity'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(Thread)
    private readonly threadRepository: Repository<Thread>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly storageService: StorageService,
    private readonly topicService: TopicsService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async create(
    createUserDto: CreateThreadDto,
    userId: string,
  ): Promise<Thread> {
    const thread = new Thread()
    const { audio, image, topic, ...createdData } = createUserDto

    if (Number.isNaN(+topic) || !await this.topicService.findOne(+topic)) throw new HttpException("Topic doesn't exists", 400)

    const newImagePath = image
      ? await this.storageService.save('threads/image-', image)
      : undefined
    const newAudioPath = audio
      ? await this.storageService.save('threads/audio-', audio)
      : undefined
    const newAudioLength = audio
      ? await this.getAudioDuration(audio.buffer)
      : undefined

    Object.assign(thread, {
      topic,
      user: userId,
      image: newImagePath,
      audio: newAudioPath,
      audio_length: newAudioLength,
      ...createdData,
    })

    const user = await this.userService.findOneById(+userId)
    user.threads_count = (+user.threads_count + 1).toString()

    await this.userRepository.save(user)
    return await this.threadRepository.save(thread)
  }

  async findAll(page: string, size: string, keyword: string, topic: number) {
    const query = []
    if (topic && (Number.isNaN(+topic) || !await this.topicService.findOne(+topic))) throw new HttpException("Topic doesn't exists", 400)
    if (keyword) query.push({title: ILike(`%${keyword}%`)}, {description: ILike(`%${keyword}%`)})
    if (topic && keyword) query.forEach((it: any) => it.topic = {id: topic} )
    if (topic && !keyword) query.push({ topic: {id: topic} })

    return await this.threadRepository
    .find({
      where: query,
      order: {
        created_at: 'DESC'
      },
      skip: +page,
      take: +size,
      relations: {
        user: true,
        topic: true,
      },
      select: {
        user: {
          name: true,
          image: true
        }
      }
    })
  }

  async findOneById(id: number): Promise<Thread> {
    const thread = await this.threadRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
      select: {
        user: {
          name: true,
          image: true
        }
      }
    })
    if (!thread) throw new HttpException("Thread doesn't exists", 400)
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
    if (!existingThread) throw new HttpException("Thread doesn't exists", 400)
    if (existingThread?.user?.id !== userId) throw new ForbiddenException()

    const { audio, image, ...updatedData } = updateThreadDto
    if (updateThreadDto.topic && (Number.isNaN(+updateThreadDto.topic) || !await this.topicService.findOne(+updateThreadDto.topic))) throw new HttpException("Topic doesn't exists", 400)
    
    const oldImagePath = this.storageService.getFilenameFromPath(
      existingThread?.image,
    )
    const oldAudioPath = this.storageService.getFilenameFromPath(
      existingThread?.audio,
    )

    const newImagePath = image
      ? await this.storageService.save('threads/image-', image)
      : undefined
    const newAudioPath = audio
      ? await this.storageService.save('threads/audio-', audio)
      : undefined
    const newAudioLength = audio
      ? await this.getAudioDuration(audio.buffer)
      : undefined

    Object.assign(existingThread, {
      image: newImagePath,
      audio: newAudioPath,
      audio_length: newAudioLength,
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
    if (!existingThread) throw new HttpException("Thread doesn't exists", 400)
    if (existingThread?.user?.id !== userId) throw new ForbiddenException()

    const oldImagePath = this.storageService.getFilenameFromPath(
      existingThread?.image,
    )
    const oldAudioPath = this.storageService.getFilenameFromPath(
      existingThread?.audio,
    )

    this.storageService.removeFileIfExists(oldImagePath)
    this.storageService.removeFileIfExists(oldAudioPath)

    const user = await this.userService.findOneById(+userId)
    user.threads_count = (+user.threads_count - 1).toString()

    await this.userRepository.save(user)

    return this.threadRepository.delete({ id })
  }

  getAudioDuration(audioBuffer: Buffer) {
    return new Promise((resolve, reject) => {
      tmp.file(function (err, path, fd, cleanup) {
        if (err) throw err
        fs.appendFile(path, audioBuffer, function (err) {
          if (err) reject(err)
          getAudioDurationInSeconds(path).then((duration) => {
            cleanup()
            resolve(duration)
          })
        })
      })
    })
  }

  async checkToxic(text: string) {
		const url = this.configService.get<string>('ML_API_URL')
		const payload = JSON.stringify({ text });
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await this.httpService.post(url, payload, config).toPromise();
			const flaggedWords = response.data;

      let flaggedTrueWords: string[] = []
      flaggedTrueWords = Object.keys(flaggedWords)
        .filter(key => flaggedWords[key] === true);
      return flaggedTrueWords;
    } catch (error) {
      console.error(error);
    }
	}
}
