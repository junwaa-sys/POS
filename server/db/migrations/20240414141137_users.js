/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('email')
    table.string('first_name')
    table.string('last_name')
    table.string('role')
    table.integer('access_level')
    table.timestamps(true, true)
    table.integer('created_by_id')
    table.string('created_by')
    table.integer('modified_by_id')
    table.string('modified_by')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
