import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<{
        statusCode: number;
        data: {
            id: number;
            name: string;
            email: string;
            profile_picture: string;
            profile_audio: string;
            status: string;
            thread_count: string;
            comment_count: string;
            created_at: string;
            updated_at: string;
        }[];
    }>;
    getProfile(email: string): Promise<User>;
    remove(id: string, req: any): Promise<void>;
}
