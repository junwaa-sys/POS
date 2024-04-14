/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('temp_carts', (table) => {
    table.increments('id')
    table.string('cart_name')
    table.integer('seller_id')
    table.string('seller')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('temp_carts')
}
