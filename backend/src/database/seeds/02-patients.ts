import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("patients").del();

  // Inserts seed entries
  await knex("patients").insert([
    {
      full_name: "Ram Thapa",
      user_id: 1,
      contact: 98233229,
      email: "patient@gmail.com",
      dob: "2050-08-09",
      image_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      is_special: false,
      is_deleted: false,
    },
    {
      id: 2,
      full_name: "Jon Snow",
      user_id: 1,
      contact: 98233229,
      email: "patient2@gmail.com",
      dob: "2050-08-09",
      image_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      is_special: false,
      is_deleted: false,
    },
    {
      id: 3,
      full_name: "Keanu K",
      user_id: 1,
      contact: 98233229,
      email: "patient3@gmail.com",
      dob: "2050-08-09",
      image_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      is_special: false,
      is_deleted: false,
    },
  ]);
}
