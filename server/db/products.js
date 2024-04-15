const connection = require('./connection')

function getProducts(db = connection) {
  return db('products').select('*').where('status', 'active')
}

function addProduct(productDetails, db = connection) {
  return db('products').insert({
    product_name: productDetails.productName,
    description: productDetails.description,
    category_id: productDetails.categoryId,
    category_name: productDetails.categoryName,
    unit_cost: productDetails.unitCost,
    sale_price: productDetails.salePrice,
    sale_unit: productDetails.saleUnit,
    start_qty: productDetails.startQty,
    status: productDetails.status,
  })
}

function updateProduct(newProductDetails, db = connection) {
  return db('products').update({
    product_name: productDetails.productName,
    description: productDetails.description,
    category_id: productDetails.categoryId,
    category_name: productDetails.categoryName,
    unit_cost: productDetails.unitCost,
    sale_price: productDetails.salePrice,
    sale_unit: productDetails.saleUnit,
    start_qty: productDetails.startQty,
    abj_qty: productDetails.adj_qty,
    status: productDetails.status,
  })
}

function deleteProduct(productId, db = connection) {
  return db('products').del().where('id', productId)
}

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
}
