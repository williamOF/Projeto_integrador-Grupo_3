var express = require('express');
var router = express.Router();

const uploadBookImg = require('../middlewares/upload-img-book')

//-------- require  controllers -------------// 
const usersControler = require('../controllers/usersControler')

// FUNCTIONS IMPORT FROM ROUTER
const upload = require('../middlewares/upload-avatar');
const checkFields = require('../middlewares/check-fields');

router.get('/cadastro', usersControler.cadastroGet)
router.post('/cadastro', upload.single('avatar'), checkFields.singUp, usersControler.cadastroPost)

router.get('/', usersControler.loginGet)
router.post('/', checkFields.login, usersControler.loginPost)
router.get('/sair',usersControler.sair)

router.get('/perfil', usersControler.perfilGet)

router.get('/perfil/admin', usersControler.adminProductsGet)
router.post('/perfil/admin', uploadBookImg.single('front_cover'), checkFields.checkBook, usersControler.adminProductsPost)

module.exports = router;