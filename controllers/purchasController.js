const {Books,Cart} = require('../database/models')

module.exports = {
    add: async (req,res) => {
        const {id_book, type, qtd} = req.body
        const admin = req.session.admin

        if(admin){
        
            await Cart.create({
                qtd_items:qtd,
                type_selected:type,
                fk_id_books: id_book,
                fk_id_user: admin.id_user,
            })

        }else{
            const error = {email:{msg:'faça login para continuar comprando'}}
            return res.render('login',{errors:error})
        }

    },
    carrinho: async (req,res) => {
        const emphasis = await Books.findAll({ where: {genre: 'fiction'}})
       
        let admin = req.session.admin

        if(admin){
            let cart_user = await Cart.findAll({include:{association:'books'},where:{fk_id_user: admin.id_user}})

           cart_user.forEach(element => {
                console.log(element.books.dataValues)
           });


        }else{
          
        }
       
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


