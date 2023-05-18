import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<{
        statusCode: number;
        data: {
            id: number;
            name: string;
            email: string;
        }[];
    }>;
    remove(id: string, req: any): Promise<void>;
}
