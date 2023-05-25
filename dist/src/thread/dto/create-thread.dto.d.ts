/// <reference types="multer" />
export declare class CreateThreadDto {
    readonly title: string;
    readonly description: string;
    readonly topic: string;
    readonly image: Express.Multer.File;
    readonly audio: Express.Multer.File;
}
