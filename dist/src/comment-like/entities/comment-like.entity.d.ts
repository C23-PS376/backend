import { User } from '../../user/entities/user.entity';
import { Comment } from "src/comment/entities/comment.entity";
export declare class LikeComment {
    id: number;
    user: User;
    comment: Comment;
}
