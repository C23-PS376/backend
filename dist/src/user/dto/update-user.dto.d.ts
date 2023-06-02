/// <reference types="multer" />
import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    readonly image: Express.Multer.File;
    readonly audio: Express.Multer.File;
    readonly status: string;
}
export {};
