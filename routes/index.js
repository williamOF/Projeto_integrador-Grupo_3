var express = require('express');
var router = express.Router();

// importação dos controllers
const indexController = require('../controllers/homeController');
const detalhesController = require('../controllers/detalhesController');
const carrinhoController = require('../controllers/carrinhoController')




/* GET home page. */

router.get('/',  indexController.home);
router.get('/produtos', carrinhoController.carrinho)
router.get('/carrinho', detalhesController.produto)
router.get('/detalhes/:id', detalhesController.produto)

router.get('/', indexController.home);
router.get('/biblioteca', indexController.biblioteca )



module.exports = router;
