import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './entities/thread.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export declare class ThreadService {
    private readonly threadRepository;
    private readonly configService;
    constructor(threadRepository: Repository<Thread>, configService: ConfigService);
    create(createUserDto: CreateThreadDto, userId: string): Promise<Thread>;
    findAll(): Promise<Thread[]>;
    findOneById(id: number): Promise<Thread>;
    update(threadId: number, updateThreadDto: UpdateThreadDto, userId: number): Promise<Thread>;
    remove(id: number, userId: number): Promise<import("typeorm").DeleteResult>;
    removeFileIfExists(path: string): Promise<unknown>;
}
