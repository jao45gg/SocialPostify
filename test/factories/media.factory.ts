import { faker } from "@faker-js/faker";

export function createMedia() {
  return {
    title: faker.company.name(),
    username: faker.person.firstName(),
  };
}
