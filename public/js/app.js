window.addEventListener('load', (event)=>{
    const boxPedidos = document.querySelector('.box-pedidos')
    const btnPerfilUsuario = document.querySelector('.perfil-info')
    const boxInfo = document.getElementById('box-info')
   
    btnPerfilUsuario.addEventListener('click', (event)=>{
        boxPedidos.classList.add('none')
        boxInfo.classList.remove('none')

        event.preventDefault()
    })

})

