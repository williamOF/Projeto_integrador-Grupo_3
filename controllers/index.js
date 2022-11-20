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
        const listGenSelect  = req.params.genero
        
        const livroGenero = produtos.filter(gen => gen.genero == listGenSelect)

        if(listGenSelect){
            res.render('biblioteca', {produtos:livroGenero, admin:user})
        }else{
            res.render('biblioteca', {produtos,admin:user })
        }
    },
    produto : (req,res) => {
        let id = req.params.id;
        let livro = produtos.find(l => l.id == id)

        const user = req.session.usuario

        res.render('detalhes.ejs', {livro,admin: user})
    },
    carrinho: (req,res) => {
        const arrBooks = [] // um array que guardara todas as informações do livro via id passado pelo book in cart
        const admin = req.session.usuario // armazena as informações do usuario 
        const bookInCart = req.session.cart // so tem a informação do id do livro e da quantidade desejada pelo usuario

        if(bookInCart !== undefined){
            for(let book of bookInCart){
                const {id_livro,qtd_livro} = book
              
                const searchBook = produtos.find(livro => livro.id == id_livro)
                searchBook.qtd_incart = qtd_livro
                
                arrBooks.push(searchBook)
            }  
            res.render('carrinho', {produtos:arrBooks,admin})
        }else{
            
            res.render('carrinho', {produtos:[],admin})

            res.send('não tem livros no carrinho')
        }

    },
    search : (req,res) => {
        const user = req.session.usuario
        const query = req.query.search
        const destaque  = produtos.filter( p => p.destaque === 1 )

        let booksFilter = produtos.filter( book => book.titulo.toLowerCase().includes(query.toLowerCase()));
        
        if(booksFilter){
            res.render('home', {produtos:booksFilter, destaque, admin:user})
        }else{
            res.redirect('/')
        }
    }    
}