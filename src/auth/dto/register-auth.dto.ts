import { IsNotEmpty, IsEmail } from 'class-validator'

export class RegisterAuthDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  readonly password: string

  @IsNotEmpty()
  readonly name: string
}
