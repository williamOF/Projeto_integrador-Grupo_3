var express = require('express');
var router = express.Router();

const adminController = require('../controllers/users/admin')

/* GET users listing. */
router.get('/', adminController.login)
router.get('/cadastro', adminController.cadastro)

module.exports = router;
