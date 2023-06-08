import { User } from '../../../src/user/entities/user.entity';
import { Thread } from '../../thread/entities/thread.entity';
export declare class Comment {
    id: number;
    user: User;
    thread: Thread;
    text: string;
    audio: string;
    created_at: string;
    updated_at: string;
    insertTime(): Promise<void>;
    updateTime(): Promise<void>;
}
