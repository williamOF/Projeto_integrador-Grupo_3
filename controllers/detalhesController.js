const fs = require('fs')
const path = require('path')

const arquivo = path.join(__dirname , "../database/data.json")
const produtos = JSON.parse(fs.readFileSync(arquivo, "utf-8"))


module.exports ={
    produto : (req,res) => {
        let id = req.params.id;
        let livro = produtos.find(l => l.id == id)
        res.render('detalhes.ejs', {livro})
    },

    recomendacoes: (req,res) => {
       if(produtos.recomendacoes){
        return recomendacoes
       }

       res.render('detalhes.ejs', {recomendacoes})
    }
}