import { PartialType } from "@nestjs/mapped-types";
import { CreatePublicationDto } from "./create-publication.dto";
import { IsNumber, IsNotEmpty, IsDateString } from "class-validator";

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
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
