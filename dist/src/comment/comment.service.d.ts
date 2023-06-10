/// <reference types="node" />
import { StorageService } from 'src/storage/storage.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserService } from 'src/user/user.service';
import { ThreadService } from 'src/thread/thread.service';
export declare class CommentService {
    private readonly commentRepository;
    private readonly userService;
    private readonly threadService;
    private readonly storageService;
    constructor(commentRepository: Repository<Comment>, userService: UserService, threadService: ThreadService, storageService: StorageService);
    create(createCommentDto: CreateCommentDto, userId: string, threadId: string): Promise<Comment>;
    update(commentId: number, threadId: number, updateCommentDto: UpdateCommentDto, userId: number): Promise<Comment>;
    remove(id: number, threadId: number, userId: number): Promise<import("typeorm").DeleteResult>;
    findOneById(commentId: number, threadId: number): Promise<Comment>;
    findAll(threadId: number, size: number): Promise<{
        id: number;
        text: string;
        audio: string;
        audio_length: string;
        created_at: string;
        updated_at: string;
        username: string;
    }[]>;
    getAudioDuration(audioBuffer: Buffer): Promise<unknown>;
}
