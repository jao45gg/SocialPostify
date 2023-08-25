import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostsRepository } from "./posts.repository";

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(createPostDto: CreatePostDto) {
    return await this.postsRepository.createPost(createPostDto);
  }

  async findAll() {
    return await this.postsRepository.getAllPosts();
  }

  async findOne(id: number) {
    const media = await this.postsRepository.getPostById(id);
    if (!media) throw new NotFoundException();

    return media;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.getPostById(id);
    if (!post) throw new NotFoundException();

    return await this.postsRepository.updatePost(id, updatePostDto);
  }

  async remove(id: number) {
    const post = await this.postsRepository.getPostById(id);
    if (!post) throw new NotFoundException();

    const publication = await this.postsRepository.getPublicationByPostId(id);
    if (publication) throw new ForbiddenException();

    return await this.postsRepository.deletePost(id);
  }
}
