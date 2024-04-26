const Router = require('express')
const db = require('../db/settings')
const multer = require('multer')
const fs = require('fs')

const router = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/server/public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

router.get('/get', async (req, res) => {
  try {
    const response = await db.getSettings()
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

router.post('/upload-logo', upload.single('image'), async (req, res) => {
  try {
    const settings = await db.getSettings()
    if (settings.logoUrl != '') {
      fs.unlinkSync(`${process.cwd()}/server/public${settings.logoUrl}`)
    }
    const logoUrl = `/images/${req.file.originalname}`
    const result = await db.logoUrlUpdate(logoUrl)

    res.json(result)
  } catch (error) {
    console.error(error)
  }
})

router.put('/update', async (req, res) => {
  try {
    const settings = req.body
    const result = await db.updateSettings(settings)
    res.json(result)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
