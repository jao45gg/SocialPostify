import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePublicationDto } from "./dto/create-publication.dto";

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addPublication(createPublicationDto: CreatePublicationDto) {
    return await this.prisma.publications.create({
      data: {
        mediaid: createPublicationDto.mediaId,
        postid: createPublicationDto.postId,
        date: createPublicationDto.date,
      },
    });
  }

  async getAllPublications() {
    return await this.prisma.publications.findMany();
  }

  async getPublicationsById(id: number) {
    return await this.prisma.publications.findUnique({
      where: {
        id,
      },
    });
  }
}
