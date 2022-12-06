const fs = require('fs')
const path = require('path')

const arquivo = path.join(__dirname , "../database/data.json")
const produtos = JSON.parse(fs.readFileSync(arquivo, "utf-8"))

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    add: (req,res) => {

        const {id, type, unidades} = req.body

        let escolhido = {id, type, unidades}

        if(req.session.carrinho == undefined){
            req.session.carrinho = [escolhido]
        }else{
            req.session.carrinho.push(escolhido)
        }
        res.redirect('/carrinho')
    },
    carrinho: (req,res) => {
        let carrinho = req.session.carrinho
        let livros = []

        if(carrinho !== undefined){
            for(let produto of carrinho){
                let findBook = produtos.find(book => book.id == produto.id)
                findBook.qtd_unidades = produto.unidades
                findBook.type_book = produto.type
                livros.push(findBook)
            }
        }
        const admin = req.session.usuario 
        const destaque  = produtos.filter( p => p.destaque == 1 ) 
        
        if(livros.length >0){
            res.render('carrinho', {livros, destaque, admin, toThousand})
        }else{
            res.render('carrinho', {livros:undefined, destaque, admin})
        }
    },
    remover: (req,res) =>{
        let {id} = req.params
        let session = req.session.carrinho

        let novoCarrinho = session.filter(item => item.id !== id)

        req.session.carrinho = novoCarrinho

        res.redirect('/carrinho')
    }
}
