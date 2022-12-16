module.exports = (sequelize, DataTypes) =>{
    const Payment = sequelize.define('Payment',{
        id_payment:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        purchase_value:DataTypes.FLOAT,
        payment_form:DataTypes.STRING,
        payment_authorized:DataTypes.STRING,
        fk_id_shopping_cart:DataTypes.INTEGER,
        fk_id_delivery:DataTypes.INTEGER
    },
    {
        tableName:'payment',
        timestamps: false
    })

    Payment.associate = (models) => {
        Payment.belongsTo(models.Shopping_cart, {foreignKey: 'fk_id_shopping_cart', as: 'shopping_cart'})
        Payment.belongsTo(models.Delivery, {foreignKey:'fk_id_delivery', as: 'delivery'})
    }

    return Payment 
}