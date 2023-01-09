window.addEventListener('load', () =>{
    
    const cep = document.querySelector('#cep')

    cep.addEventListener('blur', (e) => {

        let showResult = (result) => {
            for(let index in result){
                if(document.querySelector('#'+ index)){
                    document.querySelector('#' + index).value = result[index]
                }
            }
        }

        let search = cep.value.replace('-', '');
        
        let opcoes = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }

        fetch(`https://viacep.com.br/ws/${search}/json/`, opcoes)
            .then( response => {
                response.json()
                .then(result => {
                    showResult(result)
                })
            })
            .catch(e => console.log(e))
        console.log(search)
    })

})