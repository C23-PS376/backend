import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    signIn(loginAuthDto: LoginAuthDto): Promise<{
        id: number;
        access_token: string;
    }>;
    register(registerAuthDto: RegisterAuthDto): Promise<{
        id: number;
        access_token: string;
    }>;
}
