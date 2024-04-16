/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      email: 'hello',
      first_name: 'super admin',
      last_name: 'super admin',
      password: 'superadmin',
      role: 'super admin',
      access_level: 0,
      created_by_id: 1,
      created_by: 'admin',
    },
    {
      id: 2,
      email: 'hello',
      first_name: 'admin',
      last_name: 'admin',
      password: '$2b$10$ttJCET3qAO1BJuInvXajj..guQWblsgdiHkIgYYrKyOp3whRpOw0i',
      role: 'admin',
      access_level: 1,
      created_by_id: 1,
      created_by: 'super admin',
    },
    {
      id: 3,
      email: 'hello',
      first_name: 'sales',
      last_name: 'sales',
      password: 'sales',
      role: 'sales',
      access_level: 2,
      created_by_id: 1,
      created_by: 'super admin',
    },
  ])
}
