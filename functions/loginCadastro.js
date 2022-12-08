const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')

//************---FUNCTIONS REQUIRED ---***************/
const fsCrud = require('../functions/fs-crud')

//************--- Use Functions---***************/
const usuers = fsCrud.read('../database/users.json')

let auth = true
let errors =[false]

module.exports = {
    loginAuth: ( login, password ) => {

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
          
        const user = usuers.find(usuario => usuario.email == login)

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
        return errors
    }
}