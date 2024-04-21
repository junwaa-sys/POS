/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    { category_name: 'category 1' },
    { category_name: 'category 2' },
    { category_name: 'category 3' },
  ])
}
