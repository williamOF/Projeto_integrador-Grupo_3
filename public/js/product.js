window.addEventListener('load', ()=>{
    const tagMain = document.querySelector('main')
    console.log(tagMain)

    const btnSelectKindle = document.getElementById('btn-kindle')
    const btnSelectCommon = document.getElementById('btn-common')
    const btnSelectSpecial = document.getElementById('btn-special')
    const selectType = document.querySelector('.type-book')
    
    // referente ao preço dos produto
    const price = document.querySelector('.price')
    const kindlePrice = document.querySelector('.kindle')

    // o preço kindle será carregado como o padrão
    let kindleParseFloat = parseFloat(kindlePrice.value)

    if(kindleParseFloat > 0 ){
        selectType.value = 'kindle' 
        price.innerHTML = kindlePrice.value
    }
    
    btnSelectKindle.addEventListener('click', ()=>{

        let kindleParseFloat = parseFloat(kindlePrice.value)

        if(kindleParseFloat > 0 ){
            selectType.value = 'kindle' 
            price.innerHTML = kindlePrice.value
        }

    })
    btnSelectCommon.addEventListener('click', ()=>{
        const commonPrice = document.querySelector('.common')

        let commonParseFloat = parseFloat(commonPrice.value)

        if(commonParseFloat > 0 ){
            selectType.value = 'common' 
            price.innerHTML = commonPrice.value
        }

    })
    btnSelectSpecial.addEventListener('click', ()=>{
        const specialPrice = document.querySelector('.special')

        let specialParseFloat = parseFloat(specialPrice.value)

        if( specialParseFloat > 0 ){
            selectType.value = 'common' 
            price.innerHTML = specialPrice.value
        }
    })

    // verificação de status do estoque do produto validação front end
    const inptQtdEstoque = document.querySelector('.qtd-estoque')
    const labelEstoqueQtd = document.querySelector('.status-estoque')
    const selectQtdEstoque = document.querySelector('.select-estoque')

    //formulário listagem de um produto
    const fromListProduct = document.querySelector('.form-list-product')

    // btn referente a compras do produto
    const buyNow = document.querySelector('.buy')
    const buyAllTypes = document.querySelector('.buyAllFormat')


    // se estiver em estoque então
    let qtdEstoque = parseInt(inptQtdEstoque.value)

    if(qtdEstoque > 0 ){
        labelEstoqueQtd.innerHTML = 'Em estoque.'
        labelEstoqueQtd.classList.add('true')


    }else{
        buyAllTypes.setAttribute("disabled", "disabled")

        buyAllTypes.addEventListener('click',(event)=>{
            event.preventDefault()
        })
        buyNow.addEventListener('click',(event)=>{
            event.preventDefault()
        })
    }

    buyAllTypes.addEventListener('click',()=>{
        selectType.value = 'all-types' 
    })
    
})