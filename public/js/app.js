window.addEventListener('load', (event)=>{
    const boxPedidos = document.querySelector('.box-pedidos')
    const boxInfo = document.getElementById('box-info')
    const boxCarrinho = document.getElementById('box-carrinho')

    const btnPerfilUsuario = document.querySelector('.perfil-info')
    btnPerfilUsuario.addEventListener('click', (event)=>{
        boxPedidos.classList.add('none')
        boxCarrinho.classList.add('none')

        boxInfo.classList.remove('none')

        event.preventDefault()
    })

    const btnPedidos = document.querySelector('.pedidos')
    btnPedidos.addEventListener('click', (event)=>{
        boxInfo.classList.add('none')
        boxCarrinho.classList.add('none')

        boxPedidos.classList.remove('none')

        event.preventDefault()
    })

    const btnCarrinho = document.querySelector('.carrinho')
    btnCarrinho.addEventListener('click', (event)=>{
        boxInfo.classList.add('none')
        boxPedidos.classList.add('none')

        boxCarrinho.classList.remove('none')

        event.preventDefault()
    })
    console.log(boxCarrinho)
})

