const connection = require('./connection')

function getProducts(db = connection) {
  return db('products').select(
    'id',
    'product_name as productName',
    'description',
    'category_id as categoryId',
    'category_name as categoryName',
    'unit_cost as unitCost',
    'sale_unit as saleUnit',
    'sold_qty as soldQty',
    'bought_qty as boughtQty',
    'start_qty as startQty',
    'adj_qty as adjQty',
    'status'
  )
}

function getActiveProducts(db = connection) {
  return db('products')
    .select(
      'id',
      'product_name as productName',
      'description',
      'category_id as categoryId',
      'category_name as categoryName',
      'unit_cost as unitCost',
      'sale_unit as saleUnit',
      'sold_qty as soldQty',
      'bought_qty as boughtQty',
      'start_qty as startQty',
      'adj_qty as adjQty',
      'status'
    )
    .where('status', 'active')
}

function getPrices(db = connection) {
  return db('selling_prices').select(
    'id',
    'product_id as productId',
    'level',
    'price'
  )
}

function addProduct(productDetails, db = connection) {
  const unitCost = parseFloat(productDetails.unitCost)
  const saleUnit = parseFloat(productDetails.saleUnit)
  const startQty = parseFloat(productDetails.startQty)
  const adjQty = parseFloat(productDetails.adjQty)

  return db('products').insert({
    product_name: productDetails.productName,
    description: productDetails.description,
    category_id: productDetails.categoryId,
    category_name: productDetails.categoryName,
    unit_cost: unitCost,
    sale_unit: saleUnit,
    start_qty: startQty,
    status: productDetails.status,
    adj_qty: adjQty,
  })
}

function updateProduct(newProductDetails, db = connection) {
  const unitCost = parseFloat(newProductDetails.unitCost)
  const saleUnit = parseFloat(newProductDetails.saleUnit)
  const startQty = parseFloat(newProductDetails.startQty)
  const adjQty = parseFloat(newProductDetails.adjQty)

  return db('products')
    .update({
      product_name: newProductDetails.productName,
      description: newProductDetails.description,
      category_id: newProductDetails.categoryId,
      category_name: newProductDetails.categoryName,
      bought_qty: newProductDetails.boughtQty,
      unit_cost: unitCost,
      sale_unit: saleUnit,
      start_qty: startQty,
      adj_qty: adjQty,
      status: newProductDetails.status,
    })
    .where('id', newProductDetails.id)
}

function updatePrice(newPrices, db = connection) {
  const price = parseFloat(newPrices.price)
  return db('selling_prices').update({ price: price }).where('id', newPrices.id)
}

function addPrice(newPrice, db = connection) {
  const price = parseFloat(newPrice.price)
  const level = parseInt(newPrice.level)
  return db('selling_prices').insert({
    product_id: newPrice.productId,
    price: price,
    level: level,
  })
}

function deleteProduct(productId, db = connection) {
  return db('products').del().where('id', productId)
}

function getNewId(db = connection) {}

module.exports = {
  getProducts,
  getActiveProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getPrices,
  updatePrice,
  addPrice,
}
