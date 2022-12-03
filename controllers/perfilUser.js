
const userPerfil = (req,res) =>{
    const user = req.session.usuario
    const seAdmin = req.session.admin
    console.log(seAdmin)

    if(!seAdmin){
        res.render('userPerfil', {admin:user})
    }else{
        res.render('admin',{admin:user})
    }

}

module.exports = userPerfil