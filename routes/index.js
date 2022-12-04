var express = require('express');
const path = require('path')
const multer = require('multer')
var router = express.Router();

// importação dos controllers
const indexController = require('../controllers/index');
const bookInCart = require('../controllers/bookInCart')

//import middlwares
const saleAuth = require('../middlewares/saleAuth')


//-- multer config --//
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const local = path.join(__dirname, '../public/img/')
      cb(null, local)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


/* GET home page. */
router.get('/',  indexController.home);
router.get('/carrinho', indexController.carrinho)
router.get('/biblioteca/:genero?', indexController.biblioteca)
router.get('/showbook/:id', indexController.produto)
router.post('/showbook/add', bookInCart.add)
router.get('/search' , indexController.search)
router.get('/sale', indexController.saleProd)
router.post('/sale',upload.any(),saleAuth,indexController.saleAdd)

module.exports = router;
