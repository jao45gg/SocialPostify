import { Injectable, NotFoundException } from "@nestjs/common";
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

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
