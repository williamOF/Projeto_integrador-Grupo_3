module.exports = {
    add: (req,res) => {
        const {bookInCart,qtd} = req.body
        const session = req.session.cart

        const carrinho ={
            id_livro: bookInCart,
            qtd_livro: qtd
        }

        if(session === undefined){
            req.session.cart = [carrinho]
        }else{
            req.session.cart.push(carrinho)
        }
        res.redirect('/biblioteca')
    }
}