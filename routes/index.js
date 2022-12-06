var express = require('express');
var router = express.Router();

// importação dos controllers
const indexController = require('../controllers/index');
const carrinhoController = require('../controllers/carrinhoControler')

/* GET home page. */
router.get('/',  indexController.home);
router.get('/biblioteca/:genero?', indexController.biblioteca)
router.get('/search', indexController.search)
router.get('/showbook/:id', indexController.produto)


router.get('/carrinho', carrinhoController.carrinho)
router.post('/carrinho/add', carrinhoController.add)

router.delete('/carrinho/remover/:id', carrinhoController.remover)


module.exports = router;
