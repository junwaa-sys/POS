/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id')
    table.string('product_name')
    table.string('description')
    table.integer('category_id')
    table.string('category_name')
    table.double('unit_cost')
    table.double('sale_price')
    table.integer('sale_unit')
    table.integer('start_qty')
    table.integer('sold_qty')
    table.integer('bought_qty')
    table.integer('adj_qty')
    table.string('status')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('products')
}
