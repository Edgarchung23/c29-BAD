import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  if (!(await knex.schema.hasTable('request_log'))) {
    await knex.schema.createTable('request_log', table => {
      table.increments('id')
      table.string('method', 7).notNullable()
      table.text('url').notNullable()
      table.text('user_agent').nullable()
      table.timestamps(false, true)
    })
  }
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('request_log')
}
