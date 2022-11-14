const fs = require('fs')
const path = require('path')

const arquivo = path.join(__dirname , "../database/data.json")
const produtos = JSON.parse(fs.readFileSync(arquivo, "utf-8"))

module.exports = { 
    home : (req,res) => {

        const destaque  = produtos.filter( p => p.destaque === 1 )
        res.render('home.ejs', {produtos,destaque})
    },
    biblioteca : (req,res) => {

        res.render('biblioteca', {produtos})
    },
    produto : (req,res) => {
        let id = req.params.id;
        let livro = produtos.find(l => l.id == id);
        res.render('detalhes.ejs', {livro})
    },
    carrinho: (req,res) => {

        res.render('carrinho')
    }
    
}