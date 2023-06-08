import { IsNotEmpty } from 'class-validator'

export class CreateCommentDto {
  @IsNotEmpty()
  readonly text: string

  readonly audio: Express.Multer.File
}
