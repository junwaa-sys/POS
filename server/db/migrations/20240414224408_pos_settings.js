/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('pos_settings', (table) => {
    table.increments('id')
    table.string('logo_url')
    table.string('company_name')
    table.string('trade_name')
    table.string('email')
    table.string('phone')
    table.string('policy')
    table.integer('price_levels')
    table.integer('number_of_pos')
    table.double('tax_rate')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('pos_settings')
}
