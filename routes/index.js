var express = require('express');
var router = express.Router();

// importação dos controllers
const indexController = require('../controllers')
const detalheControler = require('../controllers/detalhesController')


router.get('/', indexController.home);
router.get('/biblioteca', indexController.biblioteca )
router.get('/showbook/:id', detalheControler.produto)
router.get('/carrinho', indexController.carrinho)



module.exports = router;
