module.exports = (sequelize, DataTypes) =>{
    let Cart = sequelize.define('Cart',{
        id_cart:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        item_price:DataTypes.DECIMAL,
        request_price:DataTypes.DECIMAL,
        qtd_items:DataTypes.INTEGER,
        status:DataTypes.STRING,
        type_selected:DataTypes.STRING,
        form_payment:DataTypes.STRING,
        status_payment:DataTypes.STRING,
        status_delivery:DataTypes.STRING,
        fk_id_books:DataTypes.INTEGER,
        fk_id_user:DataTypes.INTEGER,
    },
    {
        tableName:'cart',
        timestamps: false
    })
    
    Cart.associate = (models) => {
        Cart.belongsTo(models.Books, {foreignKey: 'fk_id_books', as: 'books'})
     }
 
    return Cart 
}