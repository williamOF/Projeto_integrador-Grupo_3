const fs = require('fs')
const path = require('path')


const localArquivo = path.resolve(__dirname + '/database/data.json')
const arqDataBase = JSON.stringify(fs.readFileSync(localArquivo,'utf8'))



const productsFilePath = path.join(__dirname + '/database/data.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


console.table(products)