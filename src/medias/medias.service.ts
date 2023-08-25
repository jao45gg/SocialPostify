import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { MediasRepository } from "./medias.reposity";

@Injectable()
export class MediasService {
  constructor(private readonly mediaReposity: MediasRepository) {}

  async create(createMediaDto: CreateMediaDto) {
    const media =
      await this.mediaReposity.getMediaByTitleAndUser(createMediaDto);
    if (media) throw new ConflictException();
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

  async findOne(id: number) {
    const media = await this.mediaReposity.getMediaById(id);
    if (!media) throw new NotFoundException();
    return media;
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
