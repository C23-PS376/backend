/// <reference types="node" />
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './entities/thread.entity';
import { Repository } from 'typeorm';
import { StorageService } from 'src/storage/storage.service';
import { TopicsService } from 'src/topics/topics.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { HttpService } from '@nestjs/axios';
export declare class ThreadService {
    private readonly threadRepository;
    private readonly userRepository;
    private readonly storageService;
    private readonly topicService;
    private readonly userService;
    private readonly httpService;
    constructor(threadRepository: Repository<Thread>, userRepository: Repository<User>, storageService: StorageService, topicService: TopicsService, userService: UserService, httpService: HttpService);
    create(createUserDto: CreateThreadDto, userId: string): Promise<Thread>;
    findAll(page: string, size: string, keyword: string, topic: number): Promise<Thread[]>;
    findOneById(id: number): Promise<Thread>;
    update(threadId: number, updateThreadDto: UpdateThreadDto, userId: number): Promise<Thread>;
    remove(id: number, userId: number): Promise<import("typeorm").DeleteResult>;
    getAudioDuration(audioBuffer: Buffer): Promise<unknown>;
    checkToxic(text: string): Promise<string[]>;
}
