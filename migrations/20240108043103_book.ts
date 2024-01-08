import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('books', table=>{
        table.increments().primary();
        table.integer('user_id')
        table.string('name')
        table.text('book_cover')
        table.string('content_url')
        table.string('bookmark')
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex): Promise<void> {
}

