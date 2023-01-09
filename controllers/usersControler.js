const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')

//************---Models required ---***************/
const {Users, Books, User_information, Cart } = require ('../database/models')
const nameFormat = require('../functions/nameFormat')

module.exports = {
    loginGet : (req,res) => {
        res.render('login')
    },
    loginPost: async (req,res) => {
        const result = validationResult(req)
         
        if( result.errors.length == 0){

            const {email,password} = req.body
            let User = await Users.findAll({ where:{email}})

            if(User){
                User.forEach(element => {
                    pass = bcrypt.compareSync(password, element.password)
                    if(pass){
                        let userData = {
                            id_user : element.id_user,
                            userName : nameFormat(element.username),
                            userEmail: element.email,
                            userAvatar: element.user_avatar
                        }
                        req.session.admin = userData


                        if(element.admin){
                           return res.redirect('/admin/')
                        }
                       
                        res.redirect('/')
                    }else{
                        const error = {password:{msg:'Senha inválida !'}}
                        res.render('login',{errors:error})
                    }
                });

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
    perfilGet: async (req,res)=>{
        let id = req.session.admin ? req.session.admin.id_user : null
        

        if(id){
            let user = await Users.findByPk(id)
            let info = await User_information.findOne({where:{fk_id_user: id}})
            let approvedCart = await Cart.findAll({include:{association:'books'},where:{fk_id_user: id ,status:'approved'}} )
            let cart = await Cart.findAll({include:{association:'books'},where:{fk_id_user: id ,status:'pending'}} )

            if(user.admin){
               return res.redirect('/admin/')
            }
       
           res.render('usuario-perfil',
           {
                admin:req.session.admin,
                user,
                info,
                approvedCart,
                cart,
                administrador: req.session.admin.admin ? req.session.admin.admin : null 
            })
            
        }else{
           res.redirect('/user/')
        }
        
    },
    perfilPost: async (req,res) =>{
       return res.redirect('/user/perfil')

    },
    adminProductsGet: (req,res)=>{

        res.render('adm-products',{admin:req.session.admin})

    },
    adminProductsGet: (req,res)=>{

        res.render('adm-products',{admin:req.session.admin})

    },
    adminProductsPost: async (req,res) => {
        const result = validationResult(req)

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
    },
    information: async (req,res) =>{
        let id = req.session.admin ? req.session.admin.id_user : null

        if(id){
            let UserInfo = await User_information.findOne({where:{fk_id_user: id}})

            res.render('information', {
                info:UserInfo,
                admin:req.session.admin
             })
        }else{
            return res.redirect('/')
        }

    },
    informationPost: async (req,res) =>{
        let id = req.session.admin ? req.session.admin.id_user : undefined ;
        
        if(id == undefined){
           return res.redirect('/')
        }else{

            const result = validationResult(req)
            let UserInfo = await User_information.findOne({where:{fk_id_user: id}})
            
            if(result.errors.length > 0){
                return res.render('information', {
                    info:UserInfo,
                    admin: req.session.admin,
                    oldData:req.body,
                    errors:result.mapped()
                })
            }

            if(UserInfo == null){
                await User_information.create(req.body,{fk_id_user:id})

            }else{
                await User_information.update(req.body,{
                    where:{ fk_id_user:id}
                })
            }
            return res.redirect('/')

        }
    }
}