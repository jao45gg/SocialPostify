import { IsString, IsNotEmpty, IsUrl, IsOptional } from "class-validator";

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsUrl()
  @IsOptional()
  image?: string;
}
