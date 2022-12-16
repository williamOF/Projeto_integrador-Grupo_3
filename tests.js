const { Users,Books ,User_information, Delivery, Cred_card,Payment,Shopping_cart,Cart } = require('./database/models')

const teste = async () =>{

   const modelsTeste = await Shopping_cart.findAll({include:{association:'payment'}})

    //const modelsTeste = await Payment.findAll()
    console.log(modelsTeste)
    

}

teste()