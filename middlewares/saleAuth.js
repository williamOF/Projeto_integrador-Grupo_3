module.exports = (req,res,next)=>{
    //verifica inputs do cadastro e retorna arrary errors e armazena na session

    const verificar = (field) => {
        let error = []
        for (let i in field){
            let item = field[i]
            if(item == ''){
                error.push({msg:`${i}: Este campo não pode estar vazio!`})
            }
        }
        if(error.length >0){
            return error
        }
    }
    let result = verificar(req.body)
    if( result != undefined){
        next()
    }else{
        return next()
    }
}