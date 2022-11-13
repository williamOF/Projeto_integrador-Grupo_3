const fs = require('fs')
const path = require('path')

const arquivo = path.join(__dirname , "../database/data.json")
const produtos = JSON.parse(fs.readFileSync(arquivo, "utf-8"))


module.exports = { 
    home : (req,res) => {

        const user = req.session.usuario

        const destaque  = produtos.filter( p => p.destaque === 1 )

        res.render('home.ejs', {produtos, destaque, admin:user})
    },
    biblioteca : (req,res) => {
        const user = req.session.usuario
        res.render('biblioteca', {produtos,admin:user })
        
    },
    produto : (req,res) => {
        let id = req.params.id;
        let livro = produtos.find(l => l.id == id)

        const user = req.session.usuario

        res.render('detalhes.ejs', {livro,admin: user})
    },
    carrinho: (req,res) => {

        const user = req.session.usuario

        res.render('carrinho',{admin:user})
    }
    
}