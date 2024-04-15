const Router = require('express')
const db = require('../db/pos')

const router = Router()

router.get('/get-product', async (req, res) => {
  try {
    const response = await db.getProducts()
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
