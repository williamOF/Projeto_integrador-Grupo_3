const fsCrud = require("../functions/fs-crud");
const bcrypt = require('bcrypt')

const checkFields = (req,res,next) =>{

    let {email,password} = req.body
    let error = [];

    if(email == ''){
    error.push({msg:"campo de email esta vazio"})
    }

    if(password == ''){
    error.push({msg:"campo senha está vazio"})
    }

    let users = fsCrud.read('../database/users.json')

    if(error.length < 1){
        let user = users.find(user => user.email == email)
        if(!user){
            error.push({msg:"usuario não encontrado na base de dados"})
        }else{
            let check = bcrypt.compareSync( password , user.senha)

            if(!check){
                error.push({msg:"senha incorreta"})
            }else{
                next()
            }
        }
    }
    if(error.length>0){
        res.send(error)
    }
}

module.exports = checkFields