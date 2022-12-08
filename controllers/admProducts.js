
module.exports = {
    getAdmProducts :(req,res)=> {
        res.render('adm-products')
    },
    postAdmProducts: (req,res) => {
        res.redirect('/')
    }
}