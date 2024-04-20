const Router = require('express')
const db = require('../db/products')

const router = Router()

router.get('/get-list', async (req, res) => {
  try {
    const response = await db.getProducts()
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})
