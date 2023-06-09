import { User } from '../../../src/user/entities/user.entity';
import { Thread } from '../../thread/entities/thread.entity';
export declare class Comment {
    id: number;
    user: User;
    thread: Thread;
    text: string;
    audio: string;
    audio_length: string;
    created_at: string;
    updated_at: string;
    updateTime(): Promise<void>;
}
