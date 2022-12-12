const { Users } = require('./models')

const teste = async () =>{ 

    const users = await Users.findAll()
    //console.log(users)
    /*const newUser = await Users.create({
        email: 'williamtesste@email.com',
        password: '123456',
        username: 'william teste',
        user_avatar: 'default.jpg'
    })*/
    let user = await Users.findByPk(2)

    //user.email = 'novoendereco@email.com'

    //user.save()

    console.log(user)
    user.destroy()

}

teste()