import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { UpdatePublicationDto } from "./dto/update-publication.dto";
import { MediasRepository } from "../medias/medias.reposity";
import { PostsRepository } from "../posts/posts.repository";
import { PublicationsRepository } from "./publications.repository";

@Injectable()
export class PublicationsService {
  constructor(
    private readonly publicationsRepository: PublicationsRepository,
    private readonly postsRepository: PostsRepository,
    private readonly mediasRepository: MediasRepository,
  ) {}

  async create(createPublicationDto: CreatePublicationDto) {
    const post = await this.postsRepository.getPostById(
      createPublicationDto.postId,
    );
    const media = await this.mediasRepository.getMediaById(
      createPublicationDto.mediaId,
    );
    if (!post || !media) throw new NotFoundException();

    return await this.publicationsRepository.addPublication(
      createPublicationDto,
    );
  }

  findAll() {
    return `This action returns all publications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publication`;
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  remove(id: number) {
    return `This action removes a #${id} publication`;
  }
}
