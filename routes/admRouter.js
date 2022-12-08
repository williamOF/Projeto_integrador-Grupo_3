const express = require('express')
const router  = express.Router()

const admProducts = require('../controllers/admProducts')

// IMPORT UPLOAD IMG BOOK //
const upload = require('../functions/upload-img-book')

router.get('/products', admProducts.getAdmProducts)
router.post('/products', upload.any(), admProducts.postAdmProducts)

module.exports = router