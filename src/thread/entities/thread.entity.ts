import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import { User } from '../../../src/user/entities/user.entity'

const current_time = new Date()

@Entity('thread')
export class Thread {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.id)
  user: User

  @Column({ nullable: false })
  title: string

  @Column({ nullable: false })
  description: string

  @Column({ default: 0 })
  comments_count: string

  @Column({ default: 0 })
  likes_count: string

  @Column({ nullable: false })
  topic: string

  @Column({ default: '' })
  image: string

  @Column({ default: '' })
  audio: string

  @Column({ nullable: false })
  created_at: string

  @Column({ nullable: false })
  updated_at: string

  @BeforeInsert()
  async insertTime() {
    this.created_at = current_time.getTime().toString()
    this.updated_at = this.created_at
  }

  @BeforeUpdate()
  async updateTime() {
    this.updated_at = current_time.getTime().toString()
  }
}
