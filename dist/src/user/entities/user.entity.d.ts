export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    profile_picture: string;
    profile_audio: string;
    status: string;
    thread_count: number;
    comment_count: number;
    created_at: Date;
    updated_at: Date;
    hashPassword(): Promise<void>;
}
