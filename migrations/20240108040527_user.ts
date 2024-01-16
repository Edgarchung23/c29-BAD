import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("user"))) {
    await knex.schema
      .createTable("users", (table) => {
        table.increments("id").primary();
        table.string("username", 32).notNullable().unique();
        table.string("password", 2048).notNullable();
        table.text("email").notNullable().unique();
        table.boolean("is_admin").notNullable();
        table.boolean("status").notNullable;
        table.timestamps(false, true);
      })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users')
}
