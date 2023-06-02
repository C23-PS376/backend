import { IsNotEmpty } from 'class-validator'

export class CreateThreadDto {
  @IsNotEmpty()
  readonly title: string

  @IsNotEmpty()
  readonly description: string

  @IsNotEmpty()
  readonly topic: string

  readonly image: Express.Multer.File
  readonly audio: Express.Multer.File
}
