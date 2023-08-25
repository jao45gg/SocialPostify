import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";

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

  async getMediaByTitleAndUser(createMediaDto: CreateMediaDto) {
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

  async getMediaById(id: number) {
    return await this.prisma.media.findUnique({
      where: {
        id,
      },
    });
  }

  async updateMedia(id: number, updateMediaDto: UpdateMediaDto) {
    return await this.prisma.media.update({
      data: {
        title: updateMediaDto.title,
        username: updateMediaDto.username,
      },
      where: {
        id,
      },
    });
  }
}
