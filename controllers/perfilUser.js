
const userPerfil = (req,res) =>{
    const user = req.session.usuario
    const seAdmin = req.session.admin

    if(!seAdmin){
        res.render('users', {admin:user})
    }else{
        res.render('admin',{admin:user})    
    }
}

module.exports = userPerfil