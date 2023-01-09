// DATA BASE MODELS 
const {Users, Books, Cart, User_information } = require('../database/models')

const moment = require('moment')

module.exports = {
    index : async (req, res) =>{
        const produtos = await Books.findAll()

        res.render('administrador', { produtos})
        
       /* if(admin){
            let admin = req.session.admin



        }else{
            res.redirect('/')
        }*/
    },
    produtos : async (req,res) => {
        try {

            let {limit = 5, start, end, page = 1} = req.params
            limit = parseInt(limit);
            page = parseInt(page -1);
            
            let { count:size, rows:products } = await Books.findAndCountAll(
                {
                    limit,
                    ofset: page * limit
                }
                )
            res.send({ size, products})

        } catch (error) {
            res.send({error: [ {msg: 'Erro'} ]});
        }
    }
}
