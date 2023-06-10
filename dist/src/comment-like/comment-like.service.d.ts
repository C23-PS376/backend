import { Repository } from 'typeorm';
import { LikeComment } from './entities/comment-like.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Thread } from 'src/thread/entities/thread.entity';
export declare class LikeCommentsService {
    private readonly likeCommentsRepository;
    private readonly commentRepository;
    private readonly threadRepository;
    constructor(likeCommentsRepository: Repository<LikeComment>, commentRepository: Repository<Comment>, threadRepository: Repository<Thread>);
    create(commentId: number, threadId: number, userId: number): Promise<LikeComment>;
    remove(commentId: number, threadId: number, userId: number): Promise<import("typeorm").DeleteResult>;
}
