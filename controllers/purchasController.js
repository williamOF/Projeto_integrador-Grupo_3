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
        let adm = req.session.usuario

        const {id, type, unidades} = req.body
        
        let fromCart = {
            id_cart: req.session.cart ? req.session.cart.length+1 : 1 ,
            id_product:id,
            type,
            unidades
        }

        if(!req.session.cart){
            req.session.cart = [fromCart]

        } else {
            req.session.cart.push(fromCart)
        }
        console.log(req.session.cart)

        return res.redirect('/carrinho')
       
    },
    carrinho: (req,res) => {
        const destaque  = produtos.filter( p => p.destaque == 1 ) 
        const admin = req.session.usuario 
        
        let cart = req.session.cart
        const DataProducts = fscrud.read('../database/data.json')
        let arrayProductsDetails = []

        if(cart){
            for(book of cart) {
                console.log(book)
                let seekBook = DataProducts.find(p => p.id == book.id_product)
                let addCart = {
                    id_pedido: book.id_cart,
                    type_selected: book.type,
                    qtd_selected: book.unidades,
                    product: seekBook
                }
                arrayProductsDetails.push(addCart) 
                
            }
        } 
        console.log(arrayProductsDetails)

        res.render('carrinho',{
            destaque,
            produtos:arrayProductsDetails,
            admin
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


