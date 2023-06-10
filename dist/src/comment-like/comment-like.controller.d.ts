import { LikeCommentsService } from './comment-like.service';
export declare class CommentLikeController {
    private readonly likeCommentsService;
    constructor(likeCommentsService: LikeCommentsService);
    create(req: any, threadId: string, id: string): Promise<{
        statusCode: number;
        data: {
            thread_id: number;
            comment_id: import("../comment/entities/comment.entity").Comment;
        };
    }>;
}
