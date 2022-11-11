var express = require('express');
var router = express.Router();

// importação dos controllers
<<<<<<< HEAD
const indexController = require('../controllers/homeController');
const detalhesController = require('../controllers/detalhesController');
const carrinhoController = require('../controllers/carrinhoController')




/* GET home page. */

router.get('/',  indexController.home);
router.get('/produtos', carrinhoController.carrinho)
router.get('/carrinho', detalhesController.produto)
router.get('/detalhes/:id', detalhesController.produto)

=======
const indexController = require('../controllers')
const detalheControler = require('../controllers/detalhesController')


>>>>>>> d6a5850a7b90a3972c082a2d107388119b470b27
router.get('/', indexController.home);
router.get('/biblioteca', indexController.biblioteca )
router.get('/showbook/:id', detalheControler.produto)
router.get('/carrinho', indexController.carrinho)



module.exports = router;
