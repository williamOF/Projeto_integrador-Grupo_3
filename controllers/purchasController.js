const {Books, Users, Cart, User_information} = require('../database/models')

/* functions is exported */
const cal_price = require('../functions/calc_price_book')

module.exports = {
    add: async (req,res) => {
        const {id_book, type, qtd} = req.body
        const admin = req.session.admin

        if(admin){
            let price = await cal_price(id_book, type)

            await Cart.create({
                item_price: price,
                request_price: ( price * qtd ),
                qtd_items:qtd,
                status:'pending',
                type_selected:type,
                fk_id_books: id_book,
                fk_id_user: admin.id_user,
            })
            return res.redirect('/carrinho')

        }else{
            const error = {email:{msg:'faça login para continuar comprando'}}
            return res.render('login',{errors:error})
        }

    },
    carrinho: async (req,res) => {
        const emphasis = await Books.findAll({ where: {genre: 'fiction'}})
           
           let admin = req.session.admin

           if(admin){
                let cart_user = await Cart.findAll({include:{association:'books'},where:{fk_id_user: admin.id_user,status:'pending'}} )

                let price = 0
                for(let item of cart_user){
                    price += parseFloat(item.request_price)
                }

                res.render('carrinho',{
                    emphasis,
                    products: cart_user,
                    admin,
                    price
                })  
   
           }else{
             res.redirect('/')
           }
        
    },
    remover: async (req,res) =>{
        let {id} = req.params
        let admin = req.session.admin

        if(admin){
            await Cart.destroy({where:{id_cart:id}})
        }
        return res.redirect('/carrinho')
    },
    clean: async (req, res) => {
        let admin = req.session.admin

        if(admin){
            await Cart.destroy({where:{fk_id_user: admin.id_user,status:'pending'}})
        }
        
        res.redirect('/carrinho')
    },
    pedido: async (req,res) => {
        let id = req.session.admin ? req.session.admin.id_user : null

        if(!id){
            return res.redirect('/')
        }

        let userInfo = await User_information.findOne({where:{fk_id_user:id}})

        if(userInfo == null){
            let error = {msg:'preencha os dados para conseguir proseguir com a compra deste produto'}
            return res.render('information',{ error, admin:req.session.admin})
        }
        return res.redirect('/api/comprar')
        
    }
}


