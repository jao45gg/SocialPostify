import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { MediasRepository } from "./medias.reposity";

@Injectable()
export class MediasService {
  constructor(private readonly mediaReposity: MediasRepository) {}

  async create(createMediaDto: CreateMediaDto) {
    const media = await this.mediaReposity.getMedia(createMediaDto);
    if (media)
      throw new HttpException(
        "Pair title and username already exist",
        HttpStatus.CONFLICT,
      );
    return this.mediaReposity.addMedia(createMediaDto);
  }

  async findAll() {
    const media = await this.mediaReposity.getAllMedias();
    return media.map((m) => ({
      id: m.id,
      title: m.title,
      username: `https://www.${m.title.toLowerCase()}.com/${m.username}`,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} media`;
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
