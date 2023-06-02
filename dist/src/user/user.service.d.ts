/// <reference types="node" />
import { DeleteResult, Repository } from 'typeorm';
import { StorageService } from 'src/storage/storage.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly storageService;
    constructor(userRepository: Repository<User>, storageService: StorageService);
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<DeleteResult>;
    validate(email: string, password: string): Promise<User | null>;
    findOneById(id: number): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    getAudioDuration(audioBuffer: Buffer): Promise<unknown>;
}
