const Router = require('express')
const db = require('../db/users')

const router = Router()

router.put('/get', async (req, res) => {
  try {
    const { userId } = req.body
    const response = await db.getUserDetails(userId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
