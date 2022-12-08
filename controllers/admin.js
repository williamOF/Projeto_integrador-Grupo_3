const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')


//************---FUNCTIONS REQUIRED ---***************/
const fsCrud = require('../functions/fs-crud')

let tokenStorage = '../database/token-user.json'
let usersStorage = '../database/users.json'

//-------------- obtendo json com dados de usuarios --------------/
const storage = path.resolve(__dirname, '../database/users.json');
const Usuarios = JSON.parse(fs.readFileSync(storage, 'utf-8'));

/* --------------function's required --------------*/ 
const loginCadastro = require('../functions/loginCadastro') 

module.exports = {
    login : (req,res) => {
        res.render('login')

    },
    loginAuth: (req,res) => {
        const users = fsCrud.read(usersStorage)
        console.log(users)


        const {email,password} = req.body
        let result = loginCadastro.loginAuth(email,password)       

        if(result[0]){
            req.session.usuario = result[1]
            res.redirect('/')
        }else{
            res.render('login',{errors:[result[1]]})
        }
    },
    sair: (req,res) =>{
        req.session.usuario = undefined
        res.redirect('/')
        
    },
    viewCadastro: (req,res) => {
        res.render('cadastro')
    },
    cadastro : (req,res) => {
        const {nome,email,re_email,senha,re_senha,avatar} = req.body

        //-------------- my validation --------------/
        let arrErrors =[]

        if(email !== re_email){
            arrErrors.push({nome :'email', msg : 'os emails não batem'})
        }

        const emailJaCadastrado = Usuarios.find(usuarios => usuarios.email == email)

        if(emailJaCadastrado){
            arrErrors.push({nome : 'email', msg : 'email já está cadastrado em nosso sistema'})
        }

        if(senha !== re_senha){
            arrErrors.push({nome : 'senha', msg : 'as senhas não batem'})
        }

        if(arrErrors.length >0){
            return res.render('cadastro', {errors: arrErrors})
        }

        //-------------- se enviado um avatar ou não, atribua estes valores --------------/
       let file = req.file
        if(file !== undefined){
            file = req.file.filename
        }else{
            file = 'default.png'
        }
 
        //-------------- criando novo objeto json --------------/
        let id = Usuarios.length +1

        const newUser = {
            id: id,
            nome : nome,
            email : email ,
            senha : bcrypt.hashSync(senha,10),
            avatar : file
        }
        const local = '../database/users.json'
        
        fsCrud.create(local, newUser)


        res.redirect('/user/perfil')  
    }
}