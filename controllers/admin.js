const path = require('path')
const fs = require('fs')

//--- import middlware express-validation ---//
const {validationResult} = require('express-validator')

const storage = path.resolve(__dirname, '../database/users.json');
const arquivo = JSON.parse(fs.readFileSync(storage, 'utf-8'));

module.exports = {
    login : (req,res) => {
        res.render('login')
    },
    viewCadastro: (req,res) => {
        res.render('cadastro')
    },
    cadastro : (req,res) => {
        const {nome,email,senha,avatar} = req.body
        const errors = validationResult(req);

        if(!errors.isEmpty()){
          return  res.render('cadastro', {errors:errors.mapped()})
        }

        let id = arquivo.length +1
        const newUser = {
            id: id,
            nome : nome,
            email : email ,
            senha : senha,
            avatar : avatar
        }
        arquivo.push(newUser)
        const newArr = JSON.stringify(arquivo, null, 4)

        fs.writeFileSync(storage, newArr)
        res.redirect('/admin/')  
    }
}