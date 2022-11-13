const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')

//--- import middlware express-validation ---//
const {validationResult} = require('express-validator')

//-------------- obtendo json com dados de usuarios --------------/
const storage = path.resolve(__dirname, '../database/users.json');
const Usuarios = JSON.parse(fs.readFileSync(storage, 'utf-8'));

module.exports = {
    login : (req,res) => {
        res.render('login')
    },
    loginAuth: (req,res) => {
        const {email,senha} = req.body

        const user = Usuarios.find(user => user.email == email)

        if(user){
            let  pass =  bcrypt.compareSync(senha, user.senha)
            if(pass){
                res.send(user)
            }
        }
        
    },
    viewCadastro: (req,res) => {
        res.render('cadastro')
    },
    cadastro : (req,res) => {
        const {nome,email,re_email,senha,re_senha,avatar} = req.body

        //-------------- express-validation result --------------/
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return  res.render('cadastro', {errors:errors.mapped()})
        }

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
            file = 'default'
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

        Usuarios.push(newUser)
        const newArr = JSON.stringify(Usuarios, null, 4)

        fs.writeFileSync(storage, newArr)
        res.redirect('/admin/')  
    }
}