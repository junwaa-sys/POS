/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('payments', (table) => {
    table.increments('id')
    table.integer('sales_id')
    table.integer('payment_type_id')
    table.string('payment_type')
    table.string('currency')
    table.double('paid_amount')
    table.double('rate')
    table.double('paid_amount_nzd')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('payments')
}
