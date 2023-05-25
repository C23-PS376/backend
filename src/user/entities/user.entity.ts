import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import { IsEmail } from 'class-validator'
import * as argon2 from 'argon2'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  @IsEmail()
  email: string

  @Column()
  password: string
  
  @Column({ nullable: true })
  profile_picture: string

  @Column({ nullable: true })
  profile_audio: string
  
  @Column({ nullable: true })
  status: string
  
  @Column({ default: 0 })
  thread_count: number
  
  @Column({ default: 0 })
  comment_count: number 
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  updated_at: Date


  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await argon2.hash(this.password)
  }
}
