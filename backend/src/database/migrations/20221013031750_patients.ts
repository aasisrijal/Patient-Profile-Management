import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists("patients", (table) => {
    table.increments().primary();
    table.string("full_name", 100);
    table.string("email").unique().notNullable();
    table.integer("contact", 100);
    table.date("dob");
    table.string("image_url");
    table;
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.boolean("is_special").defaultTo(false);
    table.boolean("is_deleted").defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("patients");
}
