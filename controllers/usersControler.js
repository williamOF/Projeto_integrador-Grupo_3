const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')

//************---Models required ---***************/
const {Users, Books, User_information} = require ('../database/models')

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
                        id_user : userData.id_user,
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
    perfilGet: async (req,res)=>{
        let admin = req.session.admin

        if(admin){

            let id = admin.id_user
            let user = await Users.findByPk(id,{ include:{association:'information'} })
            let info = user.information

            if(info.length == 0 ){
                console.log('nada ')
                let info = [{
                    dataValues:{
                        full_name:null,
                        email:null,
                        telephone:null,
                        birth_date:null,
                        user_cpf:null,
                        state:null,
                        city:null,
                        district:null,
                        road:null,
                        complements:null}
                }]
                return res.render('usuario-perfil',{admin, user, info})
            }

            res.render('usuario-perfil',{admin,user,info })

        }else{
            const error  = { type :{msg:'Página de perfil não autoriazada por favor faça o login antes !'}}
            res.render('error',{error})
        }
        
    },
    perfilPost: async (req,res) =>{
        let {full_name, email, telephone, birth_date, user_cpf, state, city, district, road, complements} = req.body
        
        let admin = req.session.admin

        if(admin){
            let id = admin.id_user
            let user = await Users.findByPk(id,{ include:{association:'information'}})
            let info = user.information
            if(info.length == 0){
                
                let infoUser = await User_information.create({
                    full_name,
                    email,
                    telephone,
                    birth_date,
                    user_cpf,
                    state,
                    city,
                    district,
                    road,
                    complements,
                    fk_id_user:admin.id_user
                })
                await infoUser.save()
            }else{
                let updateInfo = await User_information.update({
                    full_name,
                    email,
                    telephone,
                    birth_date,
                    user_cpf,
                    state,
                    city,
                    district,
                    road,
                    complements
                },{
                    where:{ fk_id_user: admin.id_user }
                })
            }
        }
       return res.redirect('/user/perfil')

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
    }
}