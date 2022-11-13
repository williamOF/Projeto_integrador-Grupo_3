var express = require('express');
var router = express.Router();
const path = require('path')
const multer = require('multer')

//-------- require  controllers -------------// 
const adminController = require('../controllers/admin')


//-- multer config --//
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const local = path.join(__dirname, '../public/images/users')
      cb(null, local)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', adminController.login)
router.post('/', adminController.loginAuth)
router.get('/cadastro', adminController.viewCadastro)
router.post('/cadastro' ,upload.single('avatar'), adminController.cadastro)

module.exports = router;
