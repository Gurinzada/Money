import faker from '@faker-js/faker';

const email = faker.internet.email();
const password = faker.internet.password();

export { email, password };
