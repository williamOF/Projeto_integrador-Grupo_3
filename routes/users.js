var express = require('express');
var router = express.Router();

//-------- require  controllers -------------// 
const usersControler = require('../controllers/usersControler')


// FUNCTIONS IMPORT FROM ROUTER
const upload = require('../middlewares/upload-avatar');
const checkFields = require('../middlewares/check-fields');

router.get('/cadastro', usersControler.viewCadastro)
router.post('/cadastro', upload.single('avatar'), checkFields.singUp, usersControler.cadastro)

router.get('/', usersControler.login)
router.post('/', checkFields.login, usersControler.loginAuthorized)
router.get('/sair',usersControler.sair)

router.get('/perfil', usersControler.usuario)

module.exports = router;