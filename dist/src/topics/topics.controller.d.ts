import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
export declare class TopicsController {
    private readonly topicsService;
    constructor(topicsService: TopicsService);
    create(createTopicDto: CreateTopicDto): Promise<{
        statusCode: number;
        data: import("./entities/topic.entity").Topic;
    }>;
    findAll(): Promise<{
        statusCode: number;
        data: import("./entities/topic.entity").Topic[];
    }>;
    update(id: string, updateTopicDto: UpdateTopicDto): Promise<{
        statusCode: number;
        data: import("./entities/topic.entity").Topic;
    }>;
    remove(id: string): Promise<void>;
}
