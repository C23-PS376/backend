import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import * as argon2 from 'argon2'
import getAudioDurationInSeconds from 'get-audio-duration'
import * as fs from 'fs'
import * as tmp from 'tmp'

import { StorageService } from 'src/storage/storage.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly storageService: StorageService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name } = createUserDto
    const isUserExists = await this.findOneByEmail(email)
    if (isUserExists) throw new HttpException('Email already exists', 400)

    const user = new User()
    Object.assign(user, { email, password, name })
    return await this.userRepository.save(user)
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.findOneById(id)
    if (!existingUser) throw new HttpException("User doesn't exists", 400)

    const { email, image, audio, ...updatedData } = updateUserDto
    const userExists = await this.findOneByEmail(email)
    if (email && userExists && userExists.id !== id)
      throw new HttpException('Email already exists', 400)

    const oldImagePath = this.storageService.getFilenameFromPath(
      existingUser.image,
    )
    const oldAudioPath = this.storageService.getFilenameFromPath(
      existingUser.audio,
    )
    const newProfilePicturePath = image
      ? await this.storageService.save('profile/image-', image)
      : undefined
    const newProfileAudioPath = audio
      ? await this.storageService.save('profile/audio-', audio)
      : undefined
    const newProfileAudioLength = audio
      ? await this.getAudioDuration(audio.buffer)
      : undefined

    Object.assign(existingUser, {
      image: newProfilePicturePath,
      audio: newProfileAudioPath,
      audio_length: newProfileAudioLength,
      ...updatedData
    })

    if (image) this.storageService.removeFileIfExists(oldImagePath)
    if (audio) this.storageService.removeFileIfExists(oldAudioPath)

    return await this.userRepository.save(existingUser)
  }

  async remove(id: number): Promise<DeleteResult> {
    const existingUser = await this.findOneById(id)
    if (!existingUser) throw new HttpException("User doesn't exists", 400)

    return this.userRepository.delete({ id })
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.findOneByEmail(email)
    if (!user) throw new HttpException("User doesn't exists", 400)

    if (await argon2.verify(user.password, password)) return user
    return null
  }

  async findOneById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new HttpException("User doesn't exists", 400)
    return user
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email })
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
}
