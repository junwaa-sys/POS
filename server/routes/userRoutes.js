const Router = require('express')
const db = require('../db/users')

const router = Router()

const bcrypt = require('bcrypt')

router.put('/get/details', async (req, res) => {
  try {
    const { userId, password } = req.body

    const response = await db.getUserDetails(userId)

    if (response) {
      bcrypt.compare(password, response.password).then(function (result) {
        if (result) {
          res.json(response)
        } else {
          res
            .status(401)
            .json({ error: 'password', message: 'incorrect password.' })
        }
      })
    } else {
      res.status(401).json({ error: 'userId', message: 'invalid user id.' })
    }
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
