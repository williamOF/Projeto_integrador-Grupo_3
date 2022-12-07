var express = require('express');
var router = express.Router();


//-------- require  controllers -------------// 
const adminController = require('../controllers/admin')
//const userPerfil = require('../controllers/perfilUser')

// FUNCTIONS IMPORT FROM ROUTER
const upload = require('../functions/upload-avatar')

/* GET users listing. */
//router.get('/perfil' , userPerfil)

router.get('/', adminController.login)
router.post('/', adminController.loginAuth)

router.get('/sair',adminController.sair)

router.get('/cadastro', adminController.viewCadastro)
router.post('/cadastro' ,upload.single('avatar'), adminController.cadastro)


module.exports = router;
