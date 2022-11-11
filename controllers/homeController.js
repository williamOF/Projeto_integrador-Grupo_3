const fs = require('fs')
const path = require('path')

const arquivo = path.join(__dirname , "../database/data.json")
const produtos = JSON.parse(fs.readFileSync(arquivo, "utf-8"))

module.exports = { 
    home : (req,res) => {

        const destaque  = produtos.filter( p => p.destaque === 1 )
        console.log(destaque)
        res.render('home.ejs', {produtos,destaque})
    },
    biblioteca : (req,res) => {

        res.render('biblioteca', {produtos})
    }
    
}