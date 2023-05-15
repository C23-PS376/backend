import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginAuthDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  readonly password: string
}
