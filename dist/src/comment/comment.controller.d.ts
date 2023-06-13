/// <reference types="multer" />
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ThreadService } from '../thread/thread.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
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
            audio_length: number;
            created_at: string;
        };
    }>;
    update(req: any, threadId: string, id: string, updateCommentDto: UpdateCommentDto, files: {
        audio?: Express.Multer.File[];
    }): Promise<{
        statusCode: number;
        data: {
            id: number;
            text: string;
            audio: string;
            audio_length: string;
        };
    }>;
    findAll(threadId: string, size: string, page: string): Promise<{
        statusCode: number;
        data: {
            id: number;
            text: string;
            audio: string;
            audio_length: string;
            created_at: string;
            updated_at: string;
            user: {
                name: string;
            };
        }[];
    }>;
    findOne(id: string, threadId: string): Promise<{
        statusCode: number;
        data: import("./entities/comment.entity").Comment;
    }>;
    remove(id: string, threadId: string, req: any): Promise<void>;
}
