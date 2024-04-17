const Router = require('express')
const db = require('../db/users')

const router = Router()

const bcrypt = require('bcrypt')
const saltRound = 10

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

router.put('/update-password', async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body
  const hashedNewPassword = await bcrypt.hash(newPassword, saltRound)
  try {
    const passwordCheck = await db.getUserDetails(userId)
    bcrypt
      .compare(oldPassword, passwordCheck.password)
      .then(async function (result) {
        if (result) {
          const response = await db.updatePassword(userId, hashedNewPassword)
          res.json(response)
        } else {
          res
            .status(401)
            .json({ error: 'password', message: 'password not matched.' })
        }
      })
  } catch {
    console.log(error)
  }
})

module.exports = router
