/// <reference types="multer" />
import { ThreadService } from './thread.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
export declare class ThreadController {
    private readonly threadService;
    constructor(threadService: ThreadService);
    create(req: any, createThreadDto: CreateThreadDto, files: {
        image?: Express.Multer.File[];
        audio?: Express.Multer.File[];
    }): Promise<{
        statusCode: number;
        data: {
            id: number;
            title: string;
            description: string;
            topic: import("../user/entities/user.entity").User;
            image: string;
            audio: string;
            audio_length: number;
            created_at: string;
        };
    }>;
    findAll(page: string, size: string, keyword: string, topic: number): Promise<{
        statusCode: number;
        data: import("./entities/thread.entity").Thread[];
    }>;
    findOne(id: string): Promise<{
        statusCode: number;
        data: import("./entities/thread.entity").Thread;
    }>;
    update(id: string, updateThreadDto: UpdateThreadDto, req: any, files: {
        image?: Express.Multer.File[];
        audio?: Express.Multer.File[];
    }): Promise<{
        statusCode: number;
        data: {
            id: number;
            title: string;
            description: string;
            topic: import("../user/entities/user.entity").User;
            image: string;
            audio: string;
            audio_length: number;
            updated_at: string;
        };
    }>;
    remove(id: string, req: any): Promise<void>;
}
