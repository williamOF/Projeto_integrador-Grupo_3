window.addEventListener('load', () => {
    const pix = document.querySelector('#pix')
    const boleto = document.querySelector('#bol')
    const cartao = document.querySelector('#car')
    
    pix.addEventListener('click', ()=>{
        pix.classList.add('btn-checked')
        boleto.classList.remove('btn-checked')
        cartao.classList.remove('btn-checked')
    })
    
    boleto.addEventListener('click', ()=>{
        boleto.classList.add('btn-checked')
        pix.classList.remove('btn-checked')
        cartao.classList.remove('btn-checked')
    })
    
    cartao.addEventListener('click', ()=>{
        cartao.classList.add('btn-checked')
        boleto.classList.remove('btn-checked')
        pix.classList.remove('btn-checked')
    })
    
})