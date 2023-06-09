import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    validate(loginAuthDto: LoginAuthDto): Promise<{
        statusCode: number;
        data: {
            id: number;
            access_token: string;
        }[];
    }>;
    create(registerAuthDto: RegisterAuthDto): Promise<{
        statusCode: number;
        data: {
            id: number;
            access_token: string;
        }[];
    }>;
}
