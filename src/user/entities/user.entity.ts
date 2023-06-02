import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import * as argon2 from 'argon2'

const current_time = new Date();

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  audio: string

  @Column({ nullable: true })
  audio_length: string

  @Column({ nullable: true })
  image: string
  
  @Column({ nullable: true })
  status: string
  
  @Column({ default: 0 })
  threads_count: string
  
  @Column({ default: 0 })
  comments_count: string 
  
  @Column({ nullable: false, default: () => current_time.getTime().toString() })
  created_at: string
  
  @Column({ nullable: false, default: () => current_time.getTime().toString() })
  updated_at: string

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await argon2.hash(this.password)
  }

  @BeforeUpdate()
  async updateTime() {
    this.updated_at = current_time.getTime().toString()
  }
}
