import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMediaDto } from "./dto/create-media.dto";

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addMedia(createMediaDto: CreateMediaDto) {
    return await this.prisma.media.create({
      data: {
        title: createMediaDto.title,
        username: createMediaDto.username,
      },
    });
  }

  async getMedia(createMediaDto: CreateMediaDto) {
    return await this.prisma.media.findFirst({
      where: {
        title: createMediaDto.title,
        username: createMediaDto.username,
      },
    });
  }

  async getAllMedias() {
    return await this.prisma.media.findMany();
  }
}
