/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('selling_prices').del()
  await knex('selling_prices').insert([
    { product_id: 1, level: 1, price: 10.0 },
    { product_id: 1, level: 2, price: 15.0 },
    { product_id: 1, level: 3, price: 20.0 },
    { product_id: 2, level: 1, price: 5.0 },
    { product_id: 2, level: 2, price: 10.0 },
    { product_id: 2, level: 3, price: 15.0 },
    { product_id: 3, level: 1, price: 1.0 },
    { product_id: 3, level: 2, price: 2.0 },
    { product_id: 3, level: 3, price: 3.0 },
  ])
}
