const fs = require('fs')
const path = require('path')

const arquivo = path.join(__dirname , "../database/data.json")
const produtos = JSON.parse(fs.readFileSync(arquivo, "utf-8"))



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
        const destaque  = produtos.filter( p => p.destaque === 1 )
        console.log(destaque)

        

        let livro = produtos.find(l => l.id == id);
        res.render('detalhes.ejs', {destaque, livro});
        

        
        

        const user = req.session.usuario

        res.render('detalhes.ejs', {livro,admin: user})

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
    }, 
    saleProd: (req,res) =>{
        
        res.render('sale')

    },
    saleAdd: (req,res) => {
        
        res.redirect('/sale')
    }
}