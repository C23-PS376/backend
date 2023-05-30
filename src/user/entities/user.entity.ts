import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import { IsEmail } from 'class-validator'
import * as argon2 from 'argon2'

const current_time = new Date();

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  @IsEmail()
  email: string

  // @Column({ select: false })
  @Column()
  password: string
  
  @Column({ nullable: true })
  profile_picture: string

  @Column({ nullable: true })
  profile_audio: string
  
  @Column({ nullable: true })
  status: string
  
  @Column({ nullable : true })
  thread_count: string
  
  @Column({ nullable : true })
  comment_count: string 
  
  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  created_at: string
  
  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await argon2.hash(this.password)
  }

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
