var express = require('express');
var router = express.Router();

// importação dos controllers
const indexController = require('../controllers')



/* GET home page. */
router.get('/', indexController.home);
router.get('/biblioteca', indexController.biblioteca )
router.get('/showbook/:id', indexController.showbook)
router.get('/carrinho', indexController.carrinho)


module.exports = router;
