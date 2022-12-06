const calcularPreco = (livros) =>{

    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let valorTotal = 0
    for(p of livros){
        switch (p.type_book) {
            case 'kindle':
                valorTotal += parseFloat(p.kindle)
                break;
            case 'common':
                valorTotal += parseFloat(p.common)
                break;
            case 'special':
                valorTotal += parseFloat(p.special)
                break;
            default:
                break;
        }
    }
    return valorTotal;
}
module.exports = calcularPreco;