import { Knex } from "knex";
import { encryptPassword } from "../../utils/password";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    { email: "user1@test.com", password: await encryptPassword("test1") },
    { email: "user2@test.com", password: await encryptPassword("test2") },
  ]);
}
