export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    profile_picture: string;
    profile_audio: string;
    status: string;
    thread_count: string;
    comment_count: string;
    created_at: string;
    updated_at: string;
    hashPassword(): Promise<void>;
    insertTime(): Promise<void>;
    updateTime(): Promise<void>;
}
