import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from '../../user/entities/user.entity'
import { Comment } from "src/comment/entities/comment.entity";

@Entity('like-comments')
export class LikeComment{
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.id)
  user: User

  @ManyToOne(() => Comment, (comment) => comment.id)
  comment: Comment

}