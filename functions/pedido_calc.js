module.exports = (cart) => {
    let price = 0

    for(let item of cart){
        price += parseFloat(item.request_price)
    }

    return price
}