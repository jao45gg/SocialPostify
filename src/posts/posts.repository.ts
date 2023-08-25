import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostDto) {
    return this.prisma.posts.create({
      data: {
        title: createPostDto.title,
        text: createPostDto.text,
        image: createPostDto?.image,
      },
    });
  }

  async getAllPosts() {
    return await this.prisma.posts.findMany();
  }
}
