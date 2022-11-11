var express = require('express');
var router = express.Router();

// importação dos controllers
const indexController = require('../controllers/index');


/* GET home page. */

router.get('/',  indexController.home);
router.get('/carrinho', indexController.carrinho)
router.get('/biblioteca', indexController.biblioteca)
router.get('/showbook/:id', indexController.produto)


module.exports = router;
