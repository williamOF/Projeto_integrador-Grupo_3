const fs = require('fs')
const path = require('path')

const arquivo = path.join(__dirname , "../database/data.json")
const produtos = JSON.parse(fs.readFileSync(arquivo, "utf-8"))


module.exports ={
    produto : (req,res) => {
        res.render('detalhes.ejs', {produtos})
    }
}