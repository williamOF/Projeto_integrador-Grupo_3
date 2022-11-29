
const userPerfil = (req,res) =>{
    const user = req.session.usuario
    res.render('userPerfil', {admin:user})
}

module.exports = userPerfil