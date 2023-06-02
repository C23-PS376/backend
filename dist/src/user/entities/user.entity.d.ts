export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    audio: string;
    audio_length: string;
    image: string;
    status: string;
    threads_count: string;
    comments_count: string;
    created_at: string;
    updated_at: string;
    hashPassword(): Promise<void>;
    insertTime(): Promise<void>;
    updateTime(): Promise<void>;
}
