import { IsNumber, IsNotEmpty, IsDateString } from "class-validator";

export class UpdatePublicationDto {
  @IsNumber()
  @IsNotEmpty()
  mediaId: number;

  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;
}
