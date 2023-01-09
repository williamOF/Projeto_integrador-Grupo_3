const express = require('express')
const router = express.Router()

//Controller import
const administradorController = require('../controllers/adiministradorController')

router.get('/', administradorController.index)

router.get('/produtos', administradorController.produtos)

module.exports = router