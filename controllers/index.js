const {Books} = require ('../database/models')

module.exports = { 
    home : async (req,res) => { 
        const books = await Books.findAll()

        res.render('home', {
            books,
            admin: req.session.admin,
        })
    },
    biblioteca :async (req,res) => {
        const admin = req.session.admin
        const genre  = req.params.genero
        let books = await Books.findAll()

        if(genre){
            let booksGenre = await Books.findAll({ where: {genre:genre} })
            return res.render('biblioteca',{
                admin,
                books:booksGenre
            })

        }else{
            return res.render('biblioteca',{
                admin,
                books
            })
        }
    },
    produto: async (req,res) => {
        const admin = req.session.admin
        const emphasis = await Books.findAll({ where: {genre: 'fiction'}})
        

        let id_book = req.params.id
        
        if(id_book){
            const book = await Books.findByPk(id_book)
                
            res.render('produto', {
                book,
                emphasis,
                admin
            })

        }else{
            const error = {error:{msg:"não encontramos nada com este id !"}}
            res.render('error', {errors:error})
        }
    },
    search : async (req,res) => {
        const query = req.query.search
        const admin = req.session.admin

        const emphasis = await Books.findAll({ where: {genre: 'fiction'}})
        const booksArray = await Books.sequelize.query(`SELECT * FROM books WHERE title LIKE '%${query}_%'`)

        let books = booksArray.shift()

        if(books.length > 0 ){
            return res.render('home',{
                admin,
                books,
                emphasis
            })

        }else{
           return res.redirect('/')
        }
    }
}