var express = require('express');
var router = express.Router();

// importação dos controllers
const indexController = require('../controllers/homeController')



/* GET home page. */
router.get('/', indexController.home);
router.get('/biblioteca', indexController.biblioteca )


module.exports = router;
