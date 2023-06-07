/// <reference types="multer" />
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(req: any, threadId: string, createCommentDto: CreateCommentDto, files: {
        audio?: Express.Multer.File[];
    }): Promise<{
        statusCode: number;
        data: {
            text: string;
            audio: string;
        }[];
    }>;
}
