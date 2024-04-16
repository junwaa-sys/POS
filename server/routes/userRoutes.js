const Router = require('express')
const db = require('../db/users')

const router = Router()

router.put('/get/details', async (req, res) => {
  try {
    const { userId } = req.body
    const response = await db.getUserDetails(userId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

router.get('/get/list', async (req, res) => {
  try {
    const response = await db.getUserList()
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
