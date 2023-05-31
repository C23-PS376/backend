import { User } from '../../user/entities/user.entity';
import { Thread } from 'src/thread/entities/thread.entity';
export declare class LikeThread {
    id: number;
    user: User;
    thread: Thread;
}
