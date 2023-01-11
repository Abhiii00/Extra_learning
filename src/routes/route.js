const express = require('express')
const router = express.Router()

const appController = require('../controllers/appController.js')

router.post('/signUp',appController.signUp)
router.post('/sendingMail',appController.sendingmail)



module.exports = router