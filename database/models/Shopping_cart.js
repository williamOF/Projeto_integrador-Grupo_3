module.exports = (sequelize, DataTypes) =>{
    const Shopping_cart = sequelize.define('Shopping_cart',{
        id_shopping_cart:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        purchase_value:DataTypes.FLOAT,
        unit_price:DataTypes.FLOAT,
        type_selected:DataTypes.STRING,
        qtd_products:DataTypes.INTEGER,
        users_id_user:DataTypes.INTEGER,
        books_id_books:DataTypes.INTEGER
    },
    {
        tablename:'shopping_cart',
        timeStamps: true
    })

    return Shopping_cart 
}