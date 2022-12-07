const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')

//--- import middlware express-validation ---//
const {validationResult} = require('express-validator')

//-------------- obtendo json com dados de usuarios --------------/
const storage = path.resolve(__dirname, '../database/users.json');
const Usuarios = JSON.parse(fs.readFileSync(storage, 'utf-8'));


module.exports = {
    loginAuth: (login,password)=>{
        let auth = true
        let errors =[]

        if(login == ''){
            auth = false
            errors.push({msg:'campo de email está vazio'})
        }
        if(password == ''){
            auth = false
            errors.push({msg:'campo de senha está vazio'})
        }

        if(!auth){
            return errors; 
        }
          
        const user = Usuarios.find(usuario => usuario.email == login)

        if(user == undefined){
            auth = false
            errors.push({msg:'usuário não encontrado na base de dados'})

        }else{
            const pass = bcrypt.compareSync(password, user.senha)

            if(!pass){
                auth = false
                errors.push({msg:'senha incorreta'})

            }else{
                return user;
            }
        }

        if(!auth){
            return errors; 
        }
    }
}