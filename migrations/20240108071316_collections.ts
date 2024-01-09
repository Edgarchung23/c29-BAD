import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("collections", (table) => {
        table.increments();
        table.integer("book_id").unsigned();
        table.foreign("book_id").references("books.id");
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");
        table.timestamps(false, true);
        // table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("collections");
}

