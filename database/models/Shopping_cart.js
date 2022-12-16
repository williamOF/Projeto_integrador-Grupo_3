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
        fk_id_cart:DataTypes.INTEGER,
    },
    {
        tableName:'shopping_cart',
        timeStamps: true
    })

    Shopping_cart.associate = (models) => {
        Shopping_cart.hasMany(models.Payment, {foreignKey: 'fk_id_shopping_cart', as:'payment'})
        Shopping_cart.belongsTo(models.Cart, {
            as:'cart',
            through: 'cart',
            foreignKey:'fk_id_cart',
            timestamps: false
        })
    }

 
    return Shopping_cart 
}