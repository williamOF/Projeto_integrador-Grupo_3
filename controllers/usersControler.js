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
const avatarStorage = '../public/images/users' 

module.exports = {
    loginGet : (req,res) => {
        res.render('login')
    },
    loginPost: (req,res) => {
        const result = validationResult(req)
         
        if( result.errors.length > 0){
            res.render('login',{errors:result.mapped()})
            
        }else{
            let {authorized,con} = loginAuth(req)
            if(authorized){
                fsCrud.create(tokenUser,con)
                req.session.usuario = con
                return res.redirect('/')

            }else{
                res.render('login', {errors:con})
            }
        }
    },
    sair: (req,res) =>{
        req.session.usuario = undefined
        res.redirect('/')
        
    },
    cadastroGet: (req,res) => {
        res.render('cadastro')
    },
    cadastroPost : (req,res) => {
        const result = validationResult(req)

        if(result.errors.length > 0){
            res.render('cadastro',{
                errors:result.mapped(),
                oldData:req.body
            })
        }else{
            const {name,email,password} = req.body

            let users =  fsCrud.read(usersDB)
            let emailExists = users.find(user => user.email == email)
            
            if(emailExists == undefined){

                const createUser = {
                    id: users.length+1,
                    name,
                    email,
                    password: bcrypt.hashSync(password,10) ,
                    avatar: req.file ? req.file.filename : 'default.png'
                }
                fsCrud.create(usersDB,createUser)

               return res.render('login')
               
            } else {
                const error = {email:{msg:'Este email já esta cadastrado no sistema'}}

                return res.render('cadastro',{
                    errors:error,
                    oldData:req.body
               })
            }
        }
    },
    perfilGet:(req,res)=>{
        let user = req.session.usuario
   
        if(user){

            res.render('usuario-perfil',{admin:user})
        }else{
            const error  = { type :{msg:'Página de perfil não autoriazada por favor faça o login antes !'}}
            res.render('error',{error})
        }
    }
}