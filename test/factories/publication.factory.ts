import { faker } from "@faker-js/faker";

export function createPublication(mediaId: number, postId: number) {
  return {
    mediaId,
    postId,
    date: faker.date.future(),
  };
}
