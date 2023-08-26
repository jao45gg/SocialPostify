import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { UpdatePublicationDto } from "./dto/update-publication.dto";
import { MediasRepository } from "../medias/medias.reposity";
import { PostsRepository } from "../posts/posts.repository";
import { PublicationsRepository } from "./publications.repository";
import * as dayjs from "dayjs";

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

  async findAll(query: any) {
    const date = new Date();
    let publications = await this.publicationsRepository.getAllPublications();

    if (query?.published !== undefined) {
      query.published === "true"
        ? (publications = publications.filter((p) => new Date(p.date) < date))
        : query.published === "false" &&
          (publications = publications.filter((p) => new Date(p.date) > date));
    }

    const after = new Date(query?.after);
    if (dayjs(after).isValid()) {
      publications = publications.filter((p) => new Date(p.date) > after);
    }

    return publications;
  }

  async findOne(id: number) {
    const publication =
      await this.publicationsRepository.getPublicationsById(id);
    if (!publication) throw new NotFoundException();

    return publication;
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const post = await this.postsRepository.getPostById(
      updatePublicationDto.postId,
    );
    const media = await this.mediasRepository.getMediaById(
      updatePublicationDto.mediaId,
    );
    const publication =
      await this.publicationsRepository.getPublicationsById(id);
    if (!post || !media || !publication) throw new NotFoundException();

    if (new Date(publication.date) < new Date()) throw new ForbiddenException();

    return this.publicationsRepository.updatePublication(
      id,
      updatePublicationDto,
    );
  }

  async remove(id: number) {
    const publication =
      await this.publicationsRepository.getPublicationsById(id);
    if (!publication) throw new NotFoundException();

    return await this.publicationsRepository.deletePublication(id);
  }
}
