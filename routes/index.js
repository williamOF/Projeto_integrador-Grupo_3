var express = require('express');
var router = express.Router();

// importação dos controllers
const indexController = require('../controllers/index');
const bookInCart = require('../controllers/bookInCart')

/* GET home page. */

router.get('/',  indexController.home);
router.get('/carrinho', indexController.carrinho)
router.get('/biblioteca/:genero?', indexController.biblioteca)
router.get('/showbook/:id', indexController.produto)
router.post('/showbook/add', bookInCart.add)
router.get('/search' , indexController.search)
router.get('/vendas', indexController.vendas)

module.exports = router;
