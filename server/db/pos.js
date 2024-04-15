const connection = require('./connection')

function getCart(db = connection) {
  return db('temp_carts')
    .join('cart_products', 'temp_carts.id', 'cart_products.cart_id')
    .select('*')
}

function getPaymentTypes(db = connection) {
  return db('payment_types').select('*')
}

function addSale(salesDetails, db = connection) {
  return db('sales').insert({
    pos_no: salesDetails.posNo,
    sales_date: salesDetails.salesDate,
    sales_amount: salesDetails.salesAmount,
    total_discount: salesDetails.totalDiscount,
    tax: salesDetails.tax,
    total_paid: salesDetails.totalPaid,
  })
}

function addPayments(salesId, paymentDetails, db = connection) {
  return db('payments').insert({
    sales_id: salesId,
    payment_type_id: paymentDetails.payment_type_id,
    payment_type: paymentDetails.payment_type,
    currency: paymentDetails.currency,
    paid_amount: paymentDetails.paid_amount,
    rate: paymentDetails.rate,
    paid_amount_nzd: paymentDetails.paid_amount_nzd,
  })
}

module.exports = {
  getCart,
  getPaymentTypes,
  addSale,
  addPayments,
}
