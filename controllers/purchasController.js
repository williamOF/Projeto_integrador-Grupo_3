const fs = require('fs')
const path = require('path');

const fscrud = require('../functions/fs-crud')
const calcPreco = require('../functions/calc-preco');
const calcUnidade = require('../functions/calc-unidade');

const arquivo = path.join(__dirname , "../database/data.json")
const produtos = JSON.parse(fs.readFileSync(arquivo, "utf-8"))

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    add: (req,res) => {
        const {id_livro, type, estoque, qtd} = req.body

        const  DataProducts =  fscrud.read('../database/data.json')
        let book = DataProducts.find(prod => prod.id == id_livro)

        if(book && book.estoque > qtd){

            let fromCart = {
                id_cart: req.session.cart ? req.session.cart.length+1 : 1 ,
                id_product: id_livro ,
                type,
                unidades:qtd
            }
            
            if(!req.session.cart){
                req.session.cart = [fromCart]

            } else {
                req.session.cart.push(fromCart)
            }
            return res.redirect('/carrinho')
            
        }else{

            let newError = {error:{msg:"imposível adicionar o livro ao carrinho produto não encontrado"}}
            return res.render('error',{
                error:newError
            })
        }

    },
    carrinho: (req,res) => {
        const destaque  = produtos.filter( p => p.destaque == 1 ) 
        const DataProducts = fscrud.read('../database/data.json')
        const admin = req.session.usuario 
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
            }
        } 

        let valorTotalCompra= 0
        for(pedido of arrayProductsDetails){
            valorTotalCompra += parseFloat(pedido.valorDoPedido) 
        }

        res.render('carrinho',{
            destaque,
            produtos:arrayProductsDetails,
            admin,
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
        const admin = req.session.usuario
        if(admin !== undefined){
            
            const localPedido = path.join(__dirname , "../database/pedidos.json")
            const pedido = JSON.parse(fs.readFileSync(localPedido, "utf-8"))
            
            const addNovoPedido = {
                id_pedido: pedido.length+1,
                id_usuario: admin.id,
                pedidos:req.session.pedido
            }
            
            req.session.carrinho = undefined
            res.render('pedido')
        }else{
            res.redirect('/user/cadastro')
        }
    }
}


