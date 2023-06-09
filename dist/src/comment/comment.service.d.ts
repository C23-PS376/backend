/// <reference types="node" />
import { StorageService } from 'src/storage/storage.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserService } from 'src/user/user.service';
import { ThreadService } from 'src/thread/thread.service';
import { Thread } from 'src/thread/entities/thread.entity';
import { User } from 'src/user/entities/user.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class CommentService {
    private readonly commentRepository;
    private readonly threadRepository;
    private readonly userRepository;
    private readonly userService;
    private readonly threadService;
    private readonly storageService;
    private readonly httpService;
    private readonly configService;
    constructor(commentRepository: Repository<Comment>, threadRepository: Repository<Thread>, userRepository: Repository<User>, userService: UserService, threadService: ThreadService, storageService: StorageService, httpService: HttpService, configService: ConfigService);
    create(createCommentDto: CreateCommentDto, userId: string, threadId: string): Promise<Comment>;
    update(commentId: number, threadId: number, updateCommentDto: UpdateCommentDto, userId: number): Promise<Comment>;
    remove(id: number, threadId: number, userId: number): Promise<import("typeorm").DeleteResult>;
    findOneById(commentId: number, threadId: number): Promise<Comment>;
    findAll(threadId: number, size: number, page: number): Promise<{
        id: number;
        text: string;
        audio: string;
        audio_length: number;
        created_at: string;
        updated_at: string;
        username: string;
    }[]>;
    findAllByUserId(userId: number, size: number, page: number): Promise<{
        id: number;
        text: string;
        audio: string;
        audio_length: number;
        created_at: string;
        updated_at: string;
        thread_id: number;
    }[]>;
    getAudioDuration(audioBuffer: Buffer): Promise<unknown>;
    checkToxic(text: string): Promise<string[]>;
}
