import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { createMedia } from "./factories/media.factory";
import { PrismaService } from "../src/prisma/prisma.service";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = await moduleFixture.resolve(PrismaService); //ou o get
    await prisma.media.deleteMany();
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
