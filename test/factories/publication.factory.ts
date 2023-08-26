import { faker } from "@faker-js/faker";

export function createPost() {
  return {
    title: faker.company.name(),
    text: faker.animal.cow(),
  };
}
