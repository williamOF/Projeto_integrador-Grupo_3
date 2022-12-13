const fs = require('fs')
const path = require('path');

const fsCrud = require('../functions/fs-crud')

const arquivo = path.join(__dirname , "../database/database/data.json")
const produtos = JSON.parse(fs.readFileSync(arquivo, "utf-8"))

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const {Books} = require('../database/models')

module.exports = {
    add: async (req,res) => {
        const {id_book, type, qtd} = req.body

        const DataBook = await Books.findByPk(id_book)
        const book = DataBook.dataValues

        console.log(type)

       if(book.inventory > qtd){

        let price = 0

        switch (type) {
            case 'kindle':
                price = book.kindle_price * parseInt(qtd)
                break;
            case 'common':
                price = book.common_price * parseInt(qtd)
                break;
            case 'special':
                price = book.special_price * parseInt(qtd)
                break;
            case 'all-types':
                price = (book.special_price + book.common_price + book.kindle_price) * parseInt(qtd)
                break;
            default:
                break;
        }
          
        }else{

            let newError = {error:{msg:"imposível adicionar o livro ao carrinho produto não encontrado"}}
            return res.render('error',{
                error:newError
            })
        }

    },
    carrinho: (req,res) => {
        const destaque  = produtos.filter( p => p.destaque == 1 ) 
        const DataProducts = fsCrud.read('../database/database/data.json')
        let cartDb = fsCrud.read('../database/database/cart.json')
      
        let cart = req.session.cart
        let arrayProductsDetails = []

        if(cart){
            for(book of cart) {
                let seekBook = DataProducts.find(p => p.id == book.id_product)
                
                let vKindle = parseFloat(seekBook.kindle);
                let vCommon = parseFloat(seekBook.common);
                let vSpecial = parseFloat(seekBook.special);
                let lastPrice = 0
                let valUnidade = 0

                switch (book.type) {
                    case 'kindle':
                        lastPrice = vKindle * parseInt(book.unidades)
                        valUnidade = vKindle
                        break;
                    case 'common':
                        lastPrice = vCommon * parseInt(book.unidades)
                        valUnidade = vCommon
                        break;
                    case 'special':
                        lastPrice = vSpecial * parseInt(book.unidades)
                        valUnidade = vSpecial
                        break;
                    case "all-types":
                        valUnidade = vCommon + vKindle + vSpecial
                        lastPrice = valUnidade * parseInt(book.unidades)
                        break;
                    default:
                        break;
                }

                let addCart = {
                    id_pedido: book.id_cart,
                    type_selected: book.type,
                    qtd_selected: book.unidades,
                    valUnidade,
                    valorDoPedido:toThousand(lastPrice),
                    product: seekBook
                }

                
                arrayProductsDetails.push(addCart)
                cartDb.push(addCart)
            }
        } 

        
        let valorTotalCompra= 0
        for(pedido of arrayProductsDetails){
            valorTotalCompra += parseFloat(pedido.valorDoPedido) 
        }
        

        res.render('carrinho',{
            destaque,
            produtos:arrayProductsDetails,
            admin:req.session.admin,
            price:toThousand(valorTotalCompra)
        })
    },
    remover: (req,res) =>{
        let {id} = req.params

        if(id){
            let inCart = req.session.cart

            let cartRemoved = inCart.filter(prod => prod.id_cart != id)
            req.session.cart = cartRemoved
        }
        return res.redirect('/carrinho')
    },
    finalizar: (req,res) => {
        console.log(req.body)
        res.render('pedido')
    }
}


