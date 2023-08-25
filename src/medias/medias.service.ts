import {
  ConflictException,
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

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const media = await this.mediaReposity.getMediaById(id);
    if (!media) throw new NotFoundException();

    const conflict =
      await this.mediaReposity.getMediaByTitleAndUser(updateMediaDto);
    if (conflict) throw new ConflictException();

    return this.mediaReposity.updateMedia(id, updateMediaDto);
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
