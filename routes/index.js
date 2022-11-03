var express = require('express');
var router = express.Router();

// importação dos controllers
const homeController = require('../controllers/homeController')
const carrinhoController = require('../controllers/carrinhoController')
const detalhesController = require('../controllers/detalhesController')
const produtosController = require('../controllers/produtosController')


/* GET home page. */
router.get('/',         homeController.home);
router.get('/produtos', carrinhoController.carrinho)
router.get('/carrinho', detalhesController.produto)
router.get('/detalhes:id', produtosController.produtos)

module.exports = router;
