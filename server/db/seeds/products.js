/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    {
      id: 1,
      product_name: 'product1',
      description: 'test description',
      category_id: 1,
      category_name: 'category 1',
      unit_cost: 1.0,
      sale_unit: 1,

      start_qty: 10,
      sold_qty: 2,
      bought_qty: 5,
      adj_qty: 2,
      status: 'active',
    },
    {
      id: 2,
      product_name: 'product2',
      description: 'test description2',
      category_id: 1,
      category_name: 'category 1',
      unit_cost: 2.0,
      sale_unit: 2,

      start_qty: 11,
      sold_qty: 3,
      bought_qty: 3,
      adj_qty: 1,
      status: 'active',
    },
    {
      id: 3,
      product_name: 'product3',
      description: 'test description3',
      category_id: 2,
      category_name: 'category 2',
      unit_cost: 6.0,
      sale_unit: 3,

      start_qty: 15,
      sold_qty: 6,
      bought_qty: 2,
      adj_qty: -6,
      status: 'inactive',
    },
  ])
}
