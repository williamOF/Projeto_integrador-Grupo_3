const {Books} = require('../database/models')

module.exports = async (id_book, type) => {
    const book = await Books.findByPk(id_book)
    let price = 0

    switch (type) {
        case 'kindle':
            price = book.kindle_price
            break;
    
        case 'common':
            price = book.common_price
            break;
                
        case 'special':
            price = book.special_price
            break;

        case 'all-types':
            price = book.kindle_price + book.common_price + book.special_price
            break;

        default:
            break;
    }
    
    if(price > 0){
        return price
    }
}

