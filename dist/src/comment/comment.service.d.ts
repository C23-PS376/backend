/// <reference types="node" />
import { StorageService } from 'src/storage/storage.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/user/entities/user.entity';
import { Thread } from 'src/thread/entities/thread.entity';
import { UserService } from 'src/user/user.service';
import { ThreadService } from 'src/thread/thread.service';
import { HttpService } from '@nestjs/axios';
export declare class CommentService {
    private readonly commentRepository;
    private readonly userRepository;
    private readonly threadRepository;
    private readonly userService;
    private readonly threadService;
    private readonly storageService;
    private readonly httpService;
    constructor(commentRepository: Repository<Comment>, userRepository: Repository<User>, threadRepository: Repository<Thread>, userService: UserService, threadService: ThreadService, storageService: StorageService, httpService: HttpService);
    create(createCommentDto: CreateCommentDto, userId: string, threadId: string): Promise<Comment>;
    update(commentId: number, threadId: number, updateCommentDto: UpdateCommentDto, userId: number): Promise<Comment>;
    remove(id: number, threadId: number, userId: number): Promise<import("typeorm").DeleteResult>;
    findOneById(commentId: number, threadId: number): Promise<Comment>;
    findAll(threadId: number, size: number, page: number): Promise<{
        id: number;
        text: string;
        audio: string;
        audio_length: string;
        created_at: string;
        updated_at: string;
        user: {
            name: string;
        };
    }[]>;
    getAudioDuration(audioBuffer: Buffer): Promise<unknown>;
}
