/// <reference types="multer" />
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    update(id: string, updateUserDto: UpdateUserDto, req: any, files: {
        image?: Express.Multer.File[];
        audio?: Express.Multer.File[];
    }): Promise<{
        statusCode: number;
        data: {
            id: number;
            name: string;
            email: string;
            audio: string;
            audio_length: string;
            image: string;
            status: string;
            created_at: string;
            updated_at: string;
        }[];
    }>;
    getProfile(id: string, req: any): Promise<{
        statusCode: number;
        data: {
            id: number;
            name: string;
            email: string;
            audio: string;
            audio_length: string;
            image: string;
            status: string;
            threads_count: string;
            comments_count: string;
            created_at: string;
            updated_at: string;
        };
    }>;
    remove(id: string, req: any): Promise<void>;
}
