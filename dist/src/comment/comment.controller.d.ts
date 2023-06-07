/// <reference types="multer" />
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ThreadService } from '../thread/thread.service';
export declare class CommentController {
    private readonly commentService;
    private readonly threadService;
    constructor(commentService: CommentService, threadService: ThreadService);
    create(req: any, threadId: string, createCommentDto: CreateCommentDto, files: {
        audio?: Express.Multer.File[];
    }): Promise<{
        statusCode: number;
        data: {
            id: number;
            threadId: number;
            text: string;
            audio: string;
        }[];
    }>;
}
