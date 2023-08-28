import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { createMedia } from "./factories/media.factory";
import { PrismaService } from "../src/prisma/prisma.service";
import { createPost } from "./factories/post.factory";
import { createPublication } from "./factories/publication.factory";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = await moduleFixture.resolve(PrismaService); //ou o get
    await prisma.publications.deleteMany();
    await prisma.media.deleteMany();
    await prisma.posts.deleteMany();
    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect("I'm okay!");
  });

  describe("Medias tests", () => {
    it("should POST a media", async () => {
      const media = createMedia();
      const response = await request(app.getHttpServer())
        .post("/medias")
        .send(media);

      expect(response.statusCode).toBe(HttpStatus.CREATED);
      expect(response.body).toEqual(
        expect.objectContaining({
          title: expect.any(String),
          username: expect.any(String),
        }),
      );
    });

    it("should GET all medias", async () => {
      const media = createMedia();
      await prisma.media.create({
        data: media,
      });
      const response = await request(app.getHttpServer()).get("/medias");

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            username: expect.any(String),
          }),
        ]),
      );
    });

    it("should GET media by id", async () => {
      const data = createMedia();
      const media = await prisma.media.create({
        data,
      });
      const response = await request(app.getHttpServer()).get(
        `/medias/${media.id}`,
      );

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          username: expect.any(String),
        }),
      );
    });

    it("should PUT media by id", async () => {
      const data = createMedia();
      const media = await prisma.media.create({
        data,
      });
      const newData = createMedia();
      const response = await request(app.getHttpServer())
        .put(`/medias/${media.id}`)
        .send(newData);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: newData.title,
          username: newData.username,
        }),
      );
    });

    it("should DELETE media by id", async () => {
      const data = createMedia();
      const media = await prisma.media.create({
        data,
      });
      const response = await request(app.getHttpServer()).delete(
        `/medias/${media.id}`,
      );

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: media.id,
          title: media.title,
          username: media.username,
        }),
      );
    });
  });

  describe("Posts tests", () => {
    it("should POST a post", async () => {
      const post = createPost();
      const response = await request(app.getHttpServer())
        .post("/posts")
        .send(post);

      expect(response.statusCode).toBe(HttpStatus.CREATED);
      expect(response.body).toEqual(
        expect.objectContaining({
          title: expect.any(String),
          text: expect.any(String),
        }),
      );
    });

    it("should GET all posts", async () => {
      const post = createPost();
      await prisma.posts.create({
        data: post,
      });
      const response = await request(app.getHttpServer()).get("/posts");

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            text: expect.any(String),
          }),
        ]),
      );
    });

    it("should GET post by id", async () => {
      const data = createPost();
      const media = await prisma.posts.create({
        data,
      });
      const response = await request(app.getHttpServer()).get(
        `/posts/${media.id}`,
      );

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          text: expect.any(String),
        }),
      );
    });

    it("should PUT post by id", async () => {
      const data = createPost();
      const post = await prisma.posts.create({
        data,
      });
      const newData = createPost();
      const response = await request(app.getHttpServer())
        .put(`/posts/${post.id}`)
        .send(newData);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: newData.title,
          text: newData.text,
        }),
      );
    });

    it("should DELETE post by id", async () => {
      const data = createPost();
      const post = await prisma.posts.create({
        data,
      });
      const response = await request(app.getHttpServer()).delete(
        `/posts/${post.id}`,
      );

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: post.id,
          title: post.title,
          text: post.text,
        }),
      );
    });
  });

  describe("Publications tests", () => {
    it("should POST a publication", async () => {
      const media = createMedia();
      const post = createPost();

      const mediaData = await prisma.media.create({
        data: media,
      });
      const postData = await prisma.posts.create({
        data: post,
      });

      const publication = createPublication(mediaData.id, postData.id);

      const response = await request(app.getHttpServer())
        .post("/publications")
        .send(publication);

      expect(response.statusCode).toBe(HttpStatus.CREATED);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          mediaid: publication.mediaId,
          postid: publication.postId,
          date: expect.any(String),
        }),
      );
    });

    it("should GET all publications", async () => {
      const media = createMedia();
      const post = createPost();

      const mediaData = await prisma.media.create({
        data: media,
      });
      const postData = await prisma.posts.create({
        data: post,
      });

      const publication = createPublication(mediaData.id, postData.id);
      await prisma.publications.create({
        data: {
          mediaid: publication.mediaId,
          postid: publication.postId,
          date: publication.date,
        },
      });
      const response = await request(app.getHttpServer()).get("/publications");

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            mediaid: publication.mediaId,
            postid: publication.postId,
            date: expect.any(String),
          }),
        ]),
      );
    });

    it("should GET publication by id", async () => {
      const media = createMedia();
      const post = createPost();

      const mediaData = await prisma.media.create({
        data: media,
      });
      const postData = await prisma.posts.create({
        data: post,
      });

      const publication = createPublication(mediaData.id, postData.id);
      const data = await prisma.publications.create({
        data: {
          mediaid: publication.mediaId,
          postid: publication.postId,
          date: publication.date,
        },
      });
      const response = await request(app.getHttpServer()).get(
        `/publications/${data.id}`,
      );

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          mediaid: expect.any(Number),
          postid: expect.any(Number),
          date: expect.any(String),
        }),
      );
    });

    it("should PUT publication by id", async () => {
      const media = createMedia();
      const post = createPost();

      const mediaData = await prisma.media.create({
        data: media,
      });
      const postData = await prisma.posts.create({
        data: post,
      });

      const publication = createPublication(mediaData.id, postData.id);
      const data = await prisma.publications.create({
        data: {
          mediaid: publication.mediaId,
          postid: publication.postId,
          date: publication.date,
        },
      });
      const newData = createPublication(mediaData.id, postData.id);
      const response = await request(app.getHttpServer())
        .put(`/publications/${data.id}`)
        .send(newData);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          mediaid: mediaData.id,
          postid: postData.id,
          date: expect.any(String),
        }),
      );
    });

    it("should DELETE publication by id", async () => {
      const media = createMedia();
      const post = createPost();

      const mediaData = await prisma.media.create({
        data: media,
      });
      const postData = await prisma.posts.create({
        data: post,
      });

      const publication = createPublication(mediaData.id, postData.id);
      const data = await prisma.publications.create({
        data: {
          mediaid: publication.mediaId,
          postid: publication.postId,
          date: publication.date,
        },
      });
      const response = await request(app.getHttpServer()).delete(
        `/publications/${data.id}`,
      );

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          mediaid: data.mediaid,
          postid: publication.postId,
          date: expect.any(String),
        }),
      );
    });
  });
});
