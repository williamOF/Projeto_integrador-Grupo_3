const calcUnidade =(produto,findBook)=>{
    let preco = 0
    if(produto.type == 'kindle'){
        preco += parseFloat(findBook.kindle)
    }
    if(produto.type == 'common'){
        preco += parseFloat(findBook.common)
    }else{
        preco += parseFloat(findBook.special)
    }
    return preco;
}
module.exports = calcUnidade;