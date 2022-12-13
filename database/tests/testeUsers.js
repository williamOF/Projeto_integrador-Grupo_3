const { Users,Books } = require('./models')

const teste = async () =>{ 

    const book = await Books.findAll()
    //console.log(users)
    /*const newUser = await Users.create({
        email: 'williamtesste@email.com',
        password: '123456',
        username: 'william teste',
        user_avatar: 'default.jpg'
    })*/
   // let user = await Users.findByPk(2)

    //user.email = 'novoendereco@email.com'

    //user.save()

    //user.destroy()
    console.log(book)

}

teste()