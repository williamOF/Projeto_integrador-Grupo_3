var express = require('express');
var router = express.Router();

//-------- require  controllers -------------// 
const adminController = require('../controllers/admin')
const perfilController = require('../controllers/perfilController')

// FUNCTIONS IMPORT FROM ROUTER
const upload = require('../functions/upload-avatar');
const checkFields = require('../functions/check-fields')

router.get('/cadastro', adminController.viewCadastro)
router.post('/cadastro' ,upload.single('avatar'), adminController.cadastro)

router.get('/', adminController.login)
router.post('/',checkFields, adminController.loginAuthorized)
router.get('/sair',adminController.sair)

router.get('/perfil', perfilController.usuario)

module.exports = router;