const express = require('express')
const router = express.Router()

//importação do controler da api
const api = require('../controllers/apiController')

router.get('/comprar', api.comprar)
router.post('/preference', api.preference)
router.post('/feedback', api.feedback)

module.exports = router