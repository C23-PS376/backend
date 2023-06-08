import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeUpdate,
} from 'typeorm'
import { User } from '../../../src/user/entities/user.entity'
import { Topic } from 'src/topics/entities/topic.entity'

const current_time = new Date()

@Entity('thread')
export class Thread {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.id)
  user: User

  @Column({ nullable: false, default: '' })
  title: string

  @Column({ nullable: false, default: '' })
  description: string

  @Column({ default: 0 })
  comments_count: string

  @Column({ default: 0 })
  likes_count: string
  
  @ManyToOne(() => Topic, (topic) => topic.id)
  topic: User

  @Column({ nullable: true })
  image: string

  @Column({ nullable: true })
  audio: string

  @Column({ nullable: true })
  audio_length: string

  @Column({ nullable: false, default: () => current_time.getTime().toString() })
  created_at: string

  @Column({ nullable: false, default: () => current_time.getTime().toString() })
  updated_at: string

  @BeforeUpdate()
  async updateTime() {
    this.updated_at = current_time.getTime().toString()
  }
}
