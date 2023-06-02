import { LikeThread } from './entities/thread-like.entity';
import { Repository } from 'typeorm';
import { Thread } from 'src/thread/entities/thread.entity';
export declare class LikeThreadsService {
    private readonly likeThreadsRepository;
    private readonly threadRepository;
    constructor(likeThreadsRepository: Repository<LikeThread>, threadRepository: Repository<Thread>);
    create(threadId: number, userId: number): Promise<LikeThread>;
    remove(threadId: number, userId: number): Promise<import("typeorm").DeleteResult>;
}
