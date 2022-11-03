
const title = 'Dh Livros'


module.exports = { 
    home : (req,res) => {
        res.render('home', {title})
    }
}