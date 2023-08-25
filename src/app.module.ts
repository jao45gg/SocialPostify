import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MediasModule } from "./medias/medias.module";
import { PostsModule } from "./posts/posts.module";
import { PublicationsModule } from "./publications/publications.module";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { MediasRepository } from "./medias/medias.reposity";

@Module({
  imports: [MediasModule, PostsModule, PublicationsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, MediasRepository],
})
export class AppModule {}
