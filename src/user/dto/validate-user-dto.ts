import { IsNotEmpty } from 'class-validator';

export class ValidateUserDto {

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}