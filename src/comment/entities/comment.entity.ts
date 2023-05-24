import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm'
import { User } from '../../../src/user/entities/user.entity'

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column()
  audio: string

  @ManyToOne(() => User, (user) => user.id)
  user: User

  @Column()
  created_at: number

  @Column()
  updated_at: number

  // TODO: Add Thread Column

  @BeforeInsert()
  async insertTime() {
    this.created_at = (new Date()).getTime()
    this.updated_at = this.created_at
  }

  @BeforeUpdate()
  async updateTime() {
    this.updated_at = (new Date()).getTime()
  }
}
