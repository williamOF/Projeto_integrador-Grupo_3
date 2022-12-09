const {check} = require('express-validator')

const validation = [
    check('email').notEmpty().withMessage('o campo email não pode estar vazio'),
    check('password').notEmpty().withMessage('o campo senha não pode estar vazio')
]

module.exports = validation 