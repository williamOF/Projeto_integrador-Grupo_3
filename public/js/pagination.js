
window.addEventListener('load',() => {
   
    const items = document.querySelectorAll('.list')
   
    const html = {
        get(element){
            return document.querySelector(element)
        }
    }

    perPage = 5
    const state = {
        page : 1,
        perPage,
        totalPage: Math.ceil(items.length / perPage)
    }

    console.log(state.totalPage)

    const controls = {
        next(){
            state.page++

            const lastPage = state.page > state.totalPage
            if(lastPage){
                state.page --
            }
        },
        prev(){
            state.page --

            if(state.page <1){
                state.page ++
            }
        },
        goTo(){
            if(page <1){
                page = 1
            }

            state.page = page

            if(page > state.totalPage){
                state.page = state.totalPage
            }
        },
        createListeners(){
            html.get('.first').addEventListener('click', () => {
                controls.goTo(1)
                update()
            })

            html.get('.last').addEventListener('click', () => {
                controls.goTo(state.totalPage)
                update()
            })

            html.get('.next').addEventListener('click', () => {
                controls.next()
                update()
            })
            
            html.get('.prev').addEventListener('click', () => {
                controls.prev()
                update()
            })
        }
    }
    controls.createListeners()

    function update (){
        console.log(state.page)
    }
  
})