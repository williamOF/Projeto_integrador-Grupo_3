const express = require("express");
const app = express();
const mercadopago = require("mercadopago");
require('dotenv').config()
const pedido_calc = require('../functions/pedido_calc')


//database import 
const {Cart, User_information} = require('../database/models')

mercadopago.configure({
	access_token: process.env.MERCADOPAGOTOKEN,
});

module.exports = {
    comprar: async (req,res) =>{
        let id = req.session.admin ? req.session.admin.id_user : null ;
        
        if(id){
            let cart = await Cart.findAll({include:{association:'books'},where:{fk_id_user: id ,status:'pending'}} )
            let info = await User_information.findOne({where: { fk_id_user: id} })


            res.render('comprar',{ 
                url:'response.body.sandbox_init_point',
                admin: req.session.admin,
                cart,
                info,
                price: pedido_calc(cart)
            } )

        }else{
            res.redirect('/')
        }
        
    },
    preference: async (req, res) => {
        let preference = {
            items: [
                {
                    title: req.body.description,
                    unit_price: Number(req.body.price),
                    quantity: parseInt(req.body.quantity),
                }
            ],
            back_urls: {
                "success": "http://localhost:3000/api/feedback",
                "failure": "http://localhost:3000/api/feedback",
                "pending": "http://localhost:3000/api/feedback"
            },
            auto_return: "approved",
        };
    
        mercadopago.preferences.create(preference)
            .then(function (response) {
                res.json({
                    id: response.body.id
                });
            }).catch(function (error) {
                console.log(error);
            });
    
    
    },
    feedback: (req, res) => {
        res.json({
            Payment: req.query.payment_id,
            Status: req.query.status,
            MerchantOrder: req.query.merchant_order_id
        });
    }

}
