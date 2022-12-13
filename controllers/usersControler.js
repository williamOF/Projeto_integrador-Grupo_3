const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')

//************---Models required ---***************/
const {Users, Books} = require ('../database/models')
const dataFormat = require('../functions/dataFormat')

module.exports = {
    loginGet : (req,res) => {
        res.render('login')
    },
    loginPost: async (req,res) => {
        const result = validationResult(req)
         
        if( result.errors.length == 0){
            const {email,password} = req.body
            let user = await Users.findAll({ where:{email}})
    
            if(user.length > 0 ){

                let passwordTru = bcrypt.compareSync(password, user[0].dataValues.password)
                if(passwordTru){

                    let userData = user[0].dataValues

                    let admin = {
                        userName : userData.username,
                        userEmail: userData.email,
                        userAvatar: userData.user_avatar
                    }

                    req.session.admin = admin

                    return res.redirect('/')

                }else{
                    const error = {password:{msg:'Senha inválida !'}}
                    res.render('login',{errors:error})
                }
            }else{
                const error = {email:{msg:'usuario não encontrado !'}}
                res.render('login',{errors:error})
            }
        }
    },
    sair: (req,res) =>{
        req.session.admin = undefined
        res.redirect('/')
        
    },
    cadastroGet: (req,res) => {
        res.render('cadastro')
    },
    cadastroPost :async (req,res) => {
        const result = validationResult(req)
        if(result.errors.length > 0){
            res.render('cadastro',{
                errors:result.mapped(),
                oldData:req.body
            })

        }else{
            const {name,email,password} = req.body
            
            let existsEmail = await Users.findAll({ where: { email: email }})
            if(existsEmail.length == 0){
                const newUser = await Users.create({
                    email,
                    password: bcrypt.hashSync(password,10),
                    username: name,
                    user_avatar: req.file ? req.file.filename : 'default.png'
                })

                await newUser.save()
                req.session.user = await newUser

                return res.render('login')

            }else{
                const error = {email:{msg:'Este email já esta cadastrado no sistema'}}
                return res.render('cadastro',{
                    errors:error,
                    oldData:req.body
               })
            }
        }
    },
    perfilGet:(req,res)=>{
        if(req.session.admin){
            res.render('usuario-perfil',{admin: req.session.admin})
        }else{
            const error  = { type :{msg:'Página de perfil não autoriazada por favor faça o login antes !'}}
            res.render('error',{error})
        }
    },
    adminProductsGet: (req,res)=>{

     res.render('adm-products',{admin:req.session.admin})
    },
    adminProductsPost: async (req,res) => {
        const result = validationResult(req)

        console.log(result)

        if(result.errors.length > 0){
            res.render('adm-products',{
                errors:result.mapped(),
                oldData:req.body
            })
        }else{

            if(!req.file){
                return res.render('adm-products',{
                    errors:result.mapped(),
                    oldData:req.body
                })
            }
            
            let newBook = await Books.create({
                title: req.body.title,
                author: req.body.author,
                publishing_company: req.body.publishing_company,
                edition: req.body.edition,
                synopsis: req.body.synopsis,
                front_cover:req.file.filename,
                genre: req.body.genre,
                kindle_price: req.body.kindle_price,
                common_price: req.body.common_price,
                special_price: req.body.special_price,
                publication_date: req.body.publication_date,
                dimensions: req.body.dimensions,
                number_pages: req.body.number_pages,
                inventory: req.body.inventory,
                language: req.body.language
            })

            await newBook.save()

            let sucessMsg = {sucess:{msg:'produto cadastrado com sucesso!'}}
            return res.render('adm-products',{sucess:sucessMsg})
        }
    }
}