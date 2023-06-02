import { LikeThreadsService } from './thread-like.service';
export declare class LikeThreadsController {
    private readonly likeThreadsService;
    constructor(likeThreadsService: LikeThreadsService);
    create(req: any, id: string): Promise<{
        statusCode: number;
        data: {
            thread_id: import("../thread/entities/thread.entity").Thread;
        };
    }>;
    remove(req: any, id: string): Promise<void>;
}
