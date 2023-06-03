/// <reference types="node" />
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './entities/thread.entity';
import { Repository } from 'typeorm';
import { StorageService } from 'src/storage/storage.service';
import { TopicsService } from 'src/topics/topics.service';
export declare class ThreadService {
    private readonly threadRepository;
    private readonly storageService;
    private readonly topicService;
    constructor(threadRepository: Repository<Thread>, storageService: StorageService, topicService: TopicsService);
    create(createUserDto: CreateThreadDto, userId: string): Promise<Thread>;
    findAll(page: string, size: string, keyword: string, topic: string): Promise<Thread[]>;
    findOneById(id: number): Promise<Thread>;
    update(threadId: number, updateThreadDto: UpdateThreadDto, userId: number): Promise<Thread>;
    remove(id: number, userId: number): Promise<import("typeorm").DeleteResult>;
    getAudioDuration(audioBuffer: Buffer): Promise<unknown>;
}
