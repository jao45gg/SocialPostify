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

  async findAll() {
    return await this.publicationsRepository.getAllPublications();
  }

  async findOne(id: number) {
    const publication =
      await this.publicationsRepository.getPublicationsById(id);
    if (!publication) throw new NotFoundException();

    return publication;
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  remove(id: number) {
    return `This action removes a #${id} publication`;
  }
}
