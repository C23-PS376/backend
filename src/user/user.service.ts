import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import * as argon2 from 'argon2'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    if (!existingUser) throw new HttpException("User didn't exists", 400)

    const { email } = updateUserDto
    const userExists = await this.findOneByEmail(email)
    if (email && userExists && userExists.id !== id)
      throw new HttpException('Email already exists', 400)

    Object.assign(existingUser, updateUserDto)
    return await this.userRepository.save(existingUser)
  }

  async remove(id: number): Promise<DeleteResult> {
    const existingUser = await this.findOneById(id)
    if (!existingUser) throw new HttpException("User didn't exists", 400)

    return this.userRepository.delete({ id })
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.findOneByEmail(email)
    if (!user) throw new HttpException("User didn't exists", 400)

    if (await argon2.verify(user.password, password)) return user
    return null
  }

  findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id })
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email })
  }

  async getUserProfile(id: number): Promise<User> {
    const existingUser = await this.findOneById(id);
    if (!existingUser) {
      throw new HttpException("User doesn't exist", 400);
    }
    return existingUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    const existingUser = await this.findOneByEmail(email);
    if (!existingUser) {
      throw new HttpException("User doesn't exist", 400);
    }
    return existingUser;
  }

  async updateUserProfile(id: number, data: Partial<User>): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new HttpException("User doesn't exist", 400);
    }
    Object.assign(user, data);
    return await this.userRepository.save(user);
  }
  
}
