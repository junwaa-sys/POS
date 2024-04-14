/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('cart_products', (table) => {
    table.increments('id')
    table.integer('cart_id')
    table.integer('product_id')
    table.string('product_name')
    table.integer('sold_qty')
    table.double('unit_price')
    table.double('total_price')
    table.double('discount')
    table.double('total_payable')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('cart_products')
}
