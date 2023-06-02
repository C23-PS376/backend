import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly image: Express.Multer.File
  readonly audio: Express.Multer.File
  readonly status: string
}
