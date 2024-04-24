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

function getPrices(db = connection) {
  return db('selling_prices').select(
    'id',
    'product_id as productId',
    'level',
    'price'
  )
}

function addProduct(productDetails, db = connection) {
  return db('products').insert({
    product_name: productDetails.productName,
    description: productDetails.description,
    category_id: productDetails.categoryId,
    category_name: productDetails.categoryName,
    unit_cost: productDetails.unitCost,
    sale_unit: productDetails.saleUnit,
    start_qty: productDetails.startQty,
    status: productDetails.status,
    adj_qty: productDetails.adjQty,
  })
}

function updateProduct(newProductDetails, db = connection) {
  return db('products').update({
    product_name: newProductDetails.productName,
    description: newProductDetails.description,
    category_id: newProductDetails.categoryId,
    category_name: newProductDetails.categoryName,
    bought_qty: newProductDetails.boughtQty,
    unit_cost: newProductDetails.unitCost,
    sale_price: newProductDetails.salePrice,
    sale_unit: newProductDetails.saleUnit,
    start_qty: newProductDetails.startQty,
    adj_qty: newProductDetails.adjQty,
    status: newProductDetails.status,
  })
}

function updatePrice(newPrices, db = connection) {
  return db('selling_prices')
    .update({ price: newPrices.price })
    .where('id', newPrices.id)
}

function addPrice(newPrice, db = connection) {
  return db('selling_prices').insert({
    product_id: newPrice.productId,
    price: newPrice.price,
    level: newPrice.level,
  })
}

function deleteProduct(productId, db = connection) {
  return db('products').del().where('id', productId)
}

function getNewId(db = connection) {}

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getPrices,
  updatePrice,
  addPrice,
}
