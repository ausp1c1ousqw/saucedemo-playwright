import { faker } from "@faker-js/faker";

export function randomPassword(length = 10) {
  return faker.internet.password(length, true, /[A-Za-z0-9!@#$%^&*]/);
}

export function randomUserName() {
  return faker.internet.username();
}
