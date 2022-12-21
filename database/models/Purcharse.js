module.exports = (sequelize, DataTypes) =>{

    const Purchase = sequelize.define('Purchase',{
        id_purchase:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        fk_id_cart:DataTypes.INTEGER,
        purchase_value:DataTypes.DECIMAL,
        form_payment:DataTypes.STRING,
        status_payment:DataTypes.STRING,
        status_delivery:DataTypes.STRING,
    },
    {
        tableName: 'purchase',
        timeStamps: true
    })
    Purchase.associate = (models) => {
        Purchase.belongsTo(models.Cart, {foreignKey:'fk_id_cart', as:'cart'})
    }

    return Purchase
}
