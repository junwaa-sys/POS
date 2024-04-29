/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('sales_products', (table) => {
    table.increments('id')
    table.integer('sales_id')
    table.integer('product_id')
    table.integer('sold_qty')
    table.double('unit_price')
    table.double('total_price')
    table.double('discount')
    table.double('discount_percent')
    table.double('total_payable')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('sales_products')
}
