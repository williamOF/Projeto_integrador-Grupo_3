const {Usuario} = require('./db/models');

const promise = async() =>{

    try {
        const user = await Usuario.findAll()
        console.log(user)
    } catch (error) {
        console.log(error)
    }
}

promise()