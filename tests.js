const { Users,Books ,User_information,Cred_card, Cart,Purchase } = require('./database/models')

const teste = async () =>{

   const modelsTeste = await Purchase.findAll()

    //const modelsTeste = await Payment.findAll()
    console.log(modelsTeste)
    

}

teste()