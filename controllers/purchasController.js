const {Books, Cart, User_information} = require('../database/models')

/* functions is exported */
const cal_price = require('../functions/calc_price_book')
const pedido_calc = require('../functions/pedido_calc')

const mercadopago = require('mercadopago')

mercadopago.configure({
    access_token: 'TEST-6183420284507006-122906-ac3f812482e4091162c97976aeace8be-1275352349'
});

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

        if(!userInfo){
            let error = {error: {msg:'preencha os dados para conseguir proseguir com a compra deste produto'}}
           return res.render('information',{
            msg:error,
            admin:req.session.admin
        })
        }
    
        let cart = await Cart.findAll({where:{fk_id_user: id},include:{association:'books'}})
        
        for(let item of cart){
            if(item.books.inventory > item.qtd_items){
                //subtraia items do estoque e atualize os dados no banco de dados
                let subInventory = item.books.inventory - item.qtd_items
                await Books.update({inventory:subInventory},{where:{id_books:item.books.id_books}})
            
            }
        }
        return res.redirect('/carrinho/pedido/finalizar')
        
    },
    finalizar: async (req,res) => {
        let id = req.session.admin ? req.session.admin.id_user : null ;
        
        if(id){
            let cart = await Cart.findAll({include:{association:'books'},where:{fk_id_user: id ,status:'pending'}} )
            let info = await User_information.findOne({where: { fk_id_user: id} })

            let price = pedido_calc(cart)
            let items = []

            for(let item of cart){
                items.push({
                    title:item.books.title,
                    unit_price: parseFloat(item.item_price),
                    quantity: parseInt(item.qtd_items),
                    currency_id:"BRL"
                })
            }

            let preference = {items};

            mercadopago.preferences.create(preference)

            .then(function(response){
                // Este valor substituirá a string "<%= global.id %>" no seu HTML
                global.id = response.body.id;
               
                res.render('finalizar',{ 
                    url:response.body.sandbox_init_point,
                    admin: req.session.admin,
                    cart,
                    info,
                    price
                 } )

            }).catch(function(error){
                console.log(error);
            });

        }else{
            res.redirect('/')
        }

    }
}


