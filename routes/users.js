var express = require('express');
var router = express.Router();
const { body } = require('express-validator');

//-------- require  controllers -------------// 
const adminController = require('../controllers/admin')

//---------- using express-validator ------------//
const validar =[
    body('nome').notEmpty().isString().isLength({min:5}),
    body('email').notEmpty().isEmail(),
    body('senha').notEmpty().isString()
]

/* GET users listing. */
router.get('/', adminController.login)
router.get('/cadastro', adminController.viewCadastro)
router.post('/cadastro',validar, adminController.cadastro)

module.exports = router;
