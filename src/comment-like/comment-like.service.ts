import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeComment } from './entities/comment-like.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Thread } from 'src/thread/entities/thread.entity';

@Injectable()
export class LikeCommentsService {
  constructor(
    @InjectRepository(LikeComment)
    private readonly likeCommentsRepository: Repository<LikeComment>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Thread)
    private readonly threadRepository: Repository<Thread>,
  ) {}

  async create(commentId: number, threadId: number, userId: number) {
    const comment = await this.commentRepository.findOneBy({ 
      id: +commentId,
      thread: {id: +threadId} 
    })
    if (!comment) throw new HttpException("Comment didn't exists", 400)
    if(
      await this.likeCommentsRepository.findOneBy(
        {
          comment: {id: commentId},
          user: {id: userId},
        }
      )
    )
    throw new HttpException('Already liked', 400)

    comment.likes_count = (+comment.likes_count + 1).toString()
    const likeComment = new LikeComment()
    Object.assign(likeComment, {
      user: userId,
      comment: +commentId
    })
    await this.commentRepository.save(comment)
    return this.likeCommentsRepository.save(likeComment)
  }

  async remove(
    commentId: number,
    threadId: number,
    userId: number,
  ) {
    const comment = await this.commentRepository.findOneBy({
      id: +commentId,
      thread: {id: +threadId},
    })

    if(!comment) throw new HttpException("Comment didn't exists", 400)
    if(
      !(await this.likeCommentsRepository.findOneBy({
        comment: {id: commentId},
        user: { id: userId },
      }))
    )
    throw new HttpException("Not liked yet", 400)

    comment.likes_count = (+comment.likes_count -1 ).toString()
    await this.commentRepository.save(comment)

    return await this.likeCommentsRepository.delete({
      comment: { id: commentId },
      user: { id: userId },
    })
  }
}
