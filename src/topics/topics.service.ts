import { HttpException, Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ){}

  async create(createTopicDto: CreateTopicDto) {
    const { name } = createTopicDto

    const isTopicExists = await this.topicRepository.findOneBy({ name })
    if (isTopicExists) throw new HttpException('The topic already exists', 400)

    const topic = new Topic()
    Object.assign(topic, { name })
    return await this.topicRepository.save(topic)
  }

  async findAll() {
    return await this.topicRepository.find();
  }

  async findOne(id: number) {
    return this.topicRepository.findOneBy({ id });
  }

  async update(id: number, updateTopicDto: UpdateTopicDto) {
    const topic = await this.topicRepository.findOneBy({ id })
    if (!topic) throw new HttpException("Topic doesn't exists", 400)

    Object.assign(topic, updateTopicDto)
    return await this.topicRepository.save(topic);
  }

  async remove(id: number) {
    const topic = await this.topicRepository.findOneBy({ id })
    if (!topic) throw new HttpException("Topic doesn't exists", 400)

    return this.topicRepository.delete({ id });
  }
}
