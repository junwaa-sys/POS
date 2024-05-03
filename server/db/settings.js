const connection = require('./connection')

function getSettings(db = connection) {
  return db('pos_settings')
    .select(
      'id',
      'logo_url as logoUrl',
      'company_name as companyName',
      'trade_name as tradeName',
      'email',
      'phone',
      'policy',
      'number_of_pos as numberOfPos',
      'price_levels as priceLevels'
    )
    .first()
}

function updateSettings(settings, db = connection) {
  return db('pos_settings')
    .update({
      company_name: settings.companyName,
      trade_name: settings.tradeName,
      email: settings.email,
      phone: settings.phone,
      policy: settings.policy,
      number_of_pos: settings.numberOfPos,
      price_levels: settings.priceLevels,
    })
    .where('id', 1)
}

function logoUrlUpdate(logoUrl, db = connection) {
  return db('pos_settings').update('logo_url', logoUrl).where('id', 1)
}

module.exports = { getSettings, updateSettings, logoUrlUpdate }
