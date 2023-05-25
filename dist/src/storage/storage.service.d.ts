/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private readonly configService;
    private storage;
    private bucket;
    constructor(configService: ConfigService);
    save(directory: string, file: Express.Multer.File): Promise<string>;
    removeFileIfExists(path: string): Promise<void>;
    generatePath(directory: string, file: Express.Multer.File): string;
    getFilenameFromPath(path: string): string;
}
