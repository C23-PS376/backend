import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { User } from '../../user/entities/user.entity'
import { Thread } from 'src/thread/entities/thread.entity'

@Entity('like-threads')
export class LikeThread {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.id)
  user: User

  @ManyToOne(() => Thread, (thread) => thread.id)
  thread: Thread
}
