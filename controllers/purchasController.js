const {Books} = require('../database/models')

module.exports = {
    add: async (req,res) => {
        const {id_book, type, qtd} = req.body
        const cart = req.session.cart
        
        const DataBook = await Books.findByPk(id_book)
        const book = DataBook.dataValues
        
       if(book.inventory > qtd){
            let price = 0
            let unit_price =0
            switch (type) {
                case 'kindle':
                    price = book.kindle_price * parseInt(qtd)
                    unit_price = book.kindle_price
                    break;
                case 'common':
                    price = book.common_price * parseInt(qtd)
                    unit_price = book.common_price
                    break;
                case 'special':
                    price = book.special_price * parseInt(qtd)
                    unit_price = book.special_price
                    break;
                case 'all-types':
                    price = (book.special_price + book.common_price + book.kindle_price) * parseInt(qtd)
                    unit_price = (book.special_price + book.common_price + book.kindle_price)
                    break;
                default:
                    break;
            }

            let inCart = {
                id_cart: req.session.cart ? req.session.cart.length + 1 : 1 ,
                purchase_value: price,
                unit_price,
                qtd_products: qtd,
                type_selected: type,
                id_books:book.id_books
            } 

            if(cart == undefined){
                req.session.cart = [inCart]
            }else{
                req.session.cart.push(inCart)
            }

            return res.redirect('/carrinho')
          
        }else{

            let newError = {error:{msg:"imposível adicionar o livro ao carrinho produto não encontrado"}}
            return res.render('error',{
                error:newError
            })
        }

    },
    carrinho: async (req,res) => {
        const emphasis = await Books.findAll({ where: {genre: 'fiction'}})
        let cart = req.session.cart
        console.log(cart)
        let admin = req.session.admin
       
        res.render('carrinho',{
            emphasis,
            shopping_cart:[],
            admin,
            price:'toThousand(shopping_value)'
        })
    },
    remover: (req,res) =>{
        let {id} = req.params

        if(id){
            let inCart = req.session.cart

            let removed = inCart.filter(prod => prod.id_cart != id)
            req.session.cart = removed
        }
        return res.redirect('/carrinho')
    },
    finalizar: (req,res) => {
        res.render('pedido')
    }
}


