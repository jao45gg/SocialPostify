import { Module } from "@nestjs/common";
import { PublicationsService } from "./publications.service";
import { PublicationsController } from "./publications.controller";
import { PublicationsRepository } from "./publications.repository";
import { PostsRepository } from "../posts/posts.repository";
import { MediasRepository } from "../medias/medias.reposity";

@Module({
  controllers: [PublicationsController],
  providers: [
    PublicationsService,
    PublicationsRepository,
    PostsRepository,
    MediasRepository,
  ],
})
export class PublicationsModule {}
