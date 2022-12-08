
const userPerfil = (req,res) =>{
    const user = req.session.usuario
    res.render('userPerfil', {user})
}

module.exports = userPerfil