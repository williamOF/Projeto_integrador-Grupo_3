var express = require('express');
var router = express.Router();

//-------- require  controllers -------------// 
const usersControler = require('../controllers/usersControler')

// FUNCTIONS IMPORT FROM ROUTER
const checkFields = require('../middlewares/check-fields');
const upload = require('../middlewares/upload-avatar');
const uploadBookImg = require('../middlewares/upload-img-book')

router.get('/cadastro', usersControler.cadastroGet)
router.post('/cadastro', upload.single('avatar'), checkFields.singUp, usersControler.cadastroPost)

router.get('/', usersControler.loginGet)
router.post('/', checkFields.login, usersControler.loginPost)
router.get('/sair',usersControler.sair)

router.get('/perfil', usersControler.perfilGet)
router.post('/perfil', checkFields.userInformation, usersControler.perfilPost)

router.get('/perfil/information', usersControler.information)
router.post('/perfil/information', usersControler.informationPost)

router.get('/perfil/admin', usersControler.adminProductsGet)
router.post('/perfil/admin', uploadBookImg.single('front_cover'), checkFields.checkBook, usersControler.adminProductsPost)

module.exports = router;