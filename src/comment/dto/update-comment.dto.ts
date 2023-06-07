import { PartialType } from '@nestjs/mapped-types'
import { CreateCommentDto } from './create-comment.dto'

export class UpdateCommentto extends PartialType(CreateCommentDto) {}
