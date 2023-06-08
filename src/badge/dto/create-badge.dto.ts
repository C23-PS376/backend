import { IsNotEmpty } from "class-validator";

export class CreateBadgeDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  image: string
}
