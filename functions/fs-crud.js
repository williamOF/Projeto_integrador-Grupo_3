const path = require('path')
const fs = require('fs')

module.exports = {

    /*
        COMO USAR !!!
        **********************************
        FUNÇÃO  CREATE ELA RECEBE 2 PARAMETROS.
        --> 1° LOCAL RELATIVO DA PASTA DE EXECUÇÃO DA FUNÇÃO.
        --> 2° É UM OBJETO QUE SERÁ ADICIONADO AO LOCAL INFORMADO NO 1° PARÂMETRO.

        FUNÇÃO READ ELA RECEBE 2 PARÂMETROS.
        --> 1° STRING LOCAL RELATIVO DA PASTA DE EXECUÇÃO DA FUNÇÃO.
    *** CONDITION SE NAO OUVER ID RETORNA O QUE ENTROU ***
         --> 2° ID DO ITEM E RETORNE A PESQUISA DO ITEM

        FUNÇÃO UPDATE ELA RECEBE 2 PARÂMETROS.
        --> 1° STRING LOCAL RELATIVO DA PASTA DE EXECUÇÃO DA FUNÇÃO.
        --> 2° É UM OBJETO QUE VC QUEIRA ATUALIZAR.

        FUNÇÃO DELETE ELA RECEBE 2 PARÂMETROS.
        --> 1°STRING LOCAL RELATIVO DA PASTA DE EXECUÇÃO DA FUNÇÃO.
        --> 2° É O ID DO OBJETO QUE DESEJA DELETAR.
    */
    
    create: ( local, newItem ) => {
        const storage = path.resolve(__dirname,local)
        if(storage == undefined){
            return [{msg:'OPA! Nenhum arquivo com este nome detectado.'}]
        }

        const {id} = newItem

        const db = JSON.parse(fs.readFileSync(storage, 'utf-8'))
        const item = db.find(prop => prop.id == id)

        if(item == undefined){
            db.push(newItem)
            fs.writeFileSync( storage, JSON.stringify( db, null , 4))
        }else{
            return [{msg:'OPA! Ese item já, existe não crie nada.'}]
        }
    },
    read: (local,id) => {
        const storage = path.resolve(__dirname,local)
        if(storage == undefined){
            return [{msg:'OPA! Nenhum arquivo com este nome detectado.'}]
        }
        const result = JSON.parse(fs.readFileSync(storage, 'utf-8'))

        if( id == undefined){
            return result

        }else{
            return result.find(item => item.id == id)
        }

    },
    update: (local,object) => {
        const storage = path.resolve(__dirname, local)
        if(storage == undefined){
            return [{msg:'OPA! Nenhum arquivo com este nome detectado.'}]
        }

        const {id} = object

        const db = JSON.parse(fs.readFileSync(storage, 'utf-8'))
        const item = db.find(prop => prop.id == id)

        if(item == undefined){
            return [{msg:'OPA! Este objeto não foi encontrado.'}]
        }
        const newDB = db.filter(prop => prop.id !== id)
        newDB.push(object)

        fs.writeFileSync( storage, JSON.stringify( newDB, null , 4))

    },
    delete : ( local, id) => {
        const storage = path.resolve(__dirname,local)
        if(storage == undefined){
            return [{msg:'OPA! Nenhum arquivo com este nome detectado.'}]
        }

        const db = JSON.parse(fs.readFileSync(storage, 'utf-8'))
        const item = db.find(p=> p.id == id)
        
        if( item !== undefined){

            const newDB = db.filter(p=> p.id != id)
            fs.writeFileSync( storage,JSON.stringify( newDB, null , 4) )

        }else{
            return [{msg:"um erro inesperado ocorreu!"}]
        }
    }
}
