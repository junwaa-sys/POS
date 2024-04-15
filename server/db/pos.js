const connection = require('./connection')

function getProducts(db = connection) {
  return db('products').select('*').where('status', 'active')
}

function getCart(db = connection) {
  return db('temp_carts')
    .join('cart_products', 'temp_carts.id', 'cart_products.cart_id')
    .select('*')
}

function getPaymentTypes(db = connection) {
  return db('payment_types').select('*')
}

module.exports = { getProducts, getCart, getPaymentTypes }
