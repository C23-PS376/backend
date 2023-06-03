import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';
export declare class TopicsService {
    private readonly topicRepository;
    constructor(topicRepository: Repository<Topic>);
    create(createTopicDto: CreateTopicDto): Promise<Topic>;
    findAll(): Promise<Topic[]>;
    update(id: number, updateTopicDto: UpdateTopicDto): Promise<Topic>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
