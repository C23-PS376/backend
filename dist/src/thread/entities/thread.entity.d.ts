import { User } from '../../../src/user/entities/user.entity';
export declare class Thread {
    id: number;
    user: User;
    title: string;
    description: string;
    comments_count: string;
    likes_count: string;
    topic: string;
    image: string;
    audio: string;
    audio_length: string;
    created_at: string;
    updated_at: string;
    insertTime(): Promise<void>;
    updateTime(): Promise<void>;
}
