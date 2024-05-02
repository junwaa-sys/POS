/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('pos_settings').del()
  await knex('pos_settings').insert([
    {
      logo_url: '',
      company_name: '',
      trade_name: '',
      email: '',
      phone: '',
      policy: '',
      number_of_pos: 1,
      price_levels: 1,
    },
  ])
}
