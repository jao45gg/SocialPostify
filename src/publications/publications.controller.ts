import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from "@nestjs/common";
import { PublicationsService } from "./publications.service";
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { UpdatePublicationDto } from "./dto/update-publication.dto";

@Controller("publications")
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  async create(@Body() createPublicationDto: CreatePublicationDto) {
    return await this.publicationsService.create(createPublicationDto);
  }

  @Get()
  async findAll(@Query() query: any) {
    return await this.publicationsService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.publicationsService.findOne(+id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
  ) {
    return await this.publicationsService.update(+id, updatePublicationDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.publicationsService.remove(+id);
  }
}
