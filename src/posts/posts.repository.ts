import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

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

  async getPostById(id: number) {
    return await this.prisma.posts.findUnique({
      where: {
        id,
      },
    });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    return await this.prisma.posts.update({
      data: {
        title: updatePostDto.title,
        text: updatePostDto.text,
      },
      where: {
        id,
      },
    });
  }

  async deletePost(id: number) {
    return await this.prisma.posts.delete({
      where: {
        id,
      },
    });
  }

  async getPublicationByPostId(postid: number) {
    return this.prisma.publications.findFirst({
      where: {
        postid,
      },
    });
  }
}
