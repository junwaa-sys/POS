const Router = require('express')
const db = require('../db/products')
const { ConstructionOutlined } = require('@mui/icons-material')

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

router.get('/get-active-products', async (req, res) => {
  try {
    const activeProducts = await db.getActiveProducts()
    const prices = await db.getPrices()

    const response = await activeProducts.map((product) => {
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
    console.error(error)
  }
})

router.put('/update', async (req, res) => {
  try {
    const productDetails = req.body
    const response = await db.updateProduct(productDetails)
    const productId = productDetails.id
    productDetails.sellingPrices.forEach(async (price) => {
      if (price.id) {
        await db.updatePrice(price)
      } else {
        price.productId = productId
        await db.addPrice(price)
      }
    })
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

router.put('/add', async (req, res) => {
  try {
    const productDetails = req.body
    const prices = productDetails.sellingPrices
    const response = await db.addProduct(productDetails)
    const addedProductId = response[0]
    prices.forEach(async (price) => {
      price.productId = addedProductId
      await db.addPrice(price)
    })
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
