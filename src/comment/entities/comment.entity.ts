import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
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
   
    @Column({ nullable: false, default: '' })
    text: string
  
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
  