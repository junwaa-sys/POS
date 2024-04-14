/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('sales', (table) => {
    table.increments('id')
    table.integer('pos_no')
    table.string('sales_date')
    table.double('sales_amount')
    table.double('total_discount')
    table.double('tax')
    table.double('total_paid')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('sales')
}
