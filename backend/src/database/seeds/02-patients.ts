import { Knex } from "knex";
import { faker } from '@faker-js/faker';

function createRandomPatients(idNumber) {
  return {
    id: idNumber,
    user_id: 1,
    full_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    image_url: faker.image.avatar(),
    dob: faker.date.birthdate(),
    contact: faker.phone.number('##########'),
    is_special: false,
    is_deleted: false,
  };
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("patients").del();

  const fakePatients = [];
  const desiredFakePatients = 1000;
  
  for (let i=1; i<=desiredFakePatients+1; i++){
    fakePatients.push(createRandomPatients(i));
  }

  // Inserts seed entries
  await knex("patients").insert(fakePatients);
}
