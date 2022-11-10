var express = require('express');
var router = express.Router();

// importação dos controllers
const indexController = require('../controllers/homeController')



/* GET home page. */

router.get('/',         homeController.home);
router.get('/produtos', carrinhoController.carrinho)
router.get('/carrinho', detalhesController.produto)
router.get('/detalhes/:id', detalhesController.produto)

router.get('/', indexController.home);
router.get('/biblioteca', indexController.biblioteca )



module.exports = router;
