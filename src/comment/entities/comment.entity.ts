import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BeforeInsert,
    BeforeUpdate,
  } from 'typeorm'
  import { User } from '../../../src/user/entities/user.entity'
	import { Thread } from '../../thread/entities/thread.entity'
  
  const current_time = new Date()
  
  @Entity('comment')
  export class Comment {
    @PrimaryGeneratedColumn()
    id: number
  
    @ManyToOne(() => User, (user) => user.id)
    user: User
  
    @ManyToOne(() => Thread, (thread) => thread.id)
    thread: Thread 
   
    @Column({ nullable: false })
    text: string
  
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
  