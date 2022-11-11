var express = require('express');
var router = express.Router();

// importação dos controllers
const indexController = require('../controllers/index');
const detalhesController = require('../controllers/detalhesController');


/* GET home page. */

router.get('/',  indexController.home);
router.get('/carrinho', indexController.carrinho)
router.get('/biblioteca', indexController.biblioteca)
router.get('/showbook/:id', detalhesController.produto)


module.exports = router;
