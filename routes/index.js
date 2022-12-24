var express = require('express');
var router = express.Router();

// importação dos controllers
const indexController = require('../controllers/index');
const purchasController = require('../controllers/purchasController')

/* GET home page. */
router.get('/',  indexController.home);
router.get('/biblioteca/:genero?', indexController.biblioteca)
router.get('/search', indexController.search)
router.get('/showbook/:id', indexController.produto)

router.get('/carrinho', purchasController.carrinho)
router.post('/carrinho/add', purchasController.add)

router.get('/carrinho/pedido', purchasController.pedido)
router.get('/carrinho/pedido/finalizar', purchasController.finalizar)

router.get('/carrinho/remover/:id', purchasController.remover)
router.get('/carrinho/clean', purchasController.clean)

module.exports = router;
