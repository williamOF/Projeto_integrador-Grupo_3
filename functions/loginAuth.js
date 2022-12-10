const fsCrud = require("./fs-crud");
const bcrypt = require('bcrypt')

const loginAuth = (req) =>{
    let {email,password} = req.body
    
    let users = fsCrud.read('../database/users.json')
    let user = users.find(user => user.email == email)

    if(!user){
      return {authorized:false,con:{email:{msg:"usuario não encontrado"}}}
    }else{
        let check = bcrypt.compareSync( password , user.password)
 
        if(!check){
            return {authorized:false,con:{password:{msg:"senha incorreta"}}}
        }else{
            return {authorized:true,con:user}
        }
    }
}

module.exports = loginAuth