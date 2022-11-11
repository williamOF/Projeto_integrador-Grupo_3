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
    showbook:  (req,res) => {
        
        const id = req.params.id
        const book = produtos.find(p => p.id ==id)
        const destaque  = produtos.filter( p => p.destaque === 1 )

        res.render('login', {book,destaque})
    },
    carrinho: (req,res) => {

        res.render('carrinho')
    }
}