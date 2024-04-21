const Router = require('express')
const db = require('../db/products')

const router = Router()

router.get('/get-list', async (req, res) => {
  try {
    const products = await db.getProducts()
    const prices = await db.getPrices()

    const response = await products.map((product) => {
      product.sellingPrices = new Array()
      prices.map((price) => {
        if (price.productId == product.id) {
          product.sellingPrices.push(price)
        }
      })
      return product
    })
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

router.put('/update', async (req, res) => {
  try {
    const productDetails = req.body
    const response = await db.updateProduct(productDetails)
    productDetails.sellingPrices.forEach((price) => {
      if (price.id === null) {
        db.addPrice(price)
      } else {
        db.updatePrice(price)
      }
    })
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})
module.exports = router
