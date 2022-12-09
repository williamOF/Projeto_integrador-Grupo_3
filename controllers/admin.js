const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')

//************---FUNCTIONS REQUIRED ---***************/
const {validationResult} = require('express-validator')
const fsCrud = require('../functions/fs-crud')
const loginAuth = require('../functions/loginAuth')

//------------- declared variable ----------------//
let usersDB = '../database/users.json'
let tokenUser = '../database/token-user.json'

module.exports = {
    login : (req,res) => {
        res.render('login')

    },
    loginAuthorized: (req,res) => {
        const result = validationResult(req)
         
        if( result.errors.length > 0){
            res.render('login',{errors:result.mapped()})
            
        }else{
            let {authorized,con} = loginAuth(req)
           
            if(authorized){
                fsCrud.create(tokenUser,con)
                req.session.usuario = con
        
                res.redirect('/')

            }else{
                
                res.render('login', {errors:con})
            }
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