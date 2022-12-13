
const sequelize = require('sequelize')

// 03584170Myke@

// 2- criar um objeto contendo os dados da conexão
const config = {
    username: "root",
    password:`03584170Myke@`,
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    database: "bookshop-of-dreams"
}

// 3- Criar conexão

const conexao = new sequelize(config);


// -4 Realizar a consulta (assincronas)!!!

let promisse  =  conexao.query('SELECT * FROM `bookshop-of-dreams`.users')

promisse.then(
    data => { console.log(data)}
)
