import { Badge } from 'src/badge/entities/badge.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    audio: string;
    audio_length: string;
    image: string;
    status: string;
    badge: Badge;
    threads_count: string;
    comments_count: string;
    created_at: string;
    updated_at: string;
    hashPassword(): Promise<void>;
    updateTime(): Promise<void>;
}
