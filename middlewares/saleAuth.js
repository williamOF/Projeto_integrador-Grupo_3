const session = require("express-session")

module.exports = (req,res,next)=>{
    const {title, author, pb_company, qt_pages, data_pb, lang, synopsis, kindle, common, special, inventory, delivery} = req.body
    
    let Errors =[]

    if(title == ''){
        Errors.push({msg:"o titulo não pode estar vazio !"})
    }
    if(author == ''){
        Errors.push({msg:"o autor não pode estar vazio !"})
    }
    if(pb_company == ''){
        Errors.push({msg:"a editora não pode estar vazio !"})
    }
    if(qt_pages == ''){
        Errors.push({msg:"a quantidade de paginas não pode ser zero!"})
    }
    if(data_pb == ''){
        Errors.push({msg:"informe a data de publicação do livro!"})
    }
    if(synopsis == ''){
        Errors.push({msg:"descreva algo para sinopse"})
    }
    if(lang == ''){
        Errors.push({msg:"o que aconteceu com o idioma do livro???"})
    }
    if(inventory == ''){
        Errors.push({msg:"a quantidade de produtos a venda nao pode ser menor q 1"})
    }

    let k = parseInt(kindle)
    let c = parseInt(common)
    let s = parseInt(special)
    let soma = k+c+s;
    if(soma == 0){
        Errors.push({msg:"informe um preço válido para o produto"})
    }

    return next()
}