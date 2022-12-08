module.exports = {
    usuario:(req,res)=>{
        let user = req.session.usuario

        res.render('usuario-perfil',{admin:user})
    }
}