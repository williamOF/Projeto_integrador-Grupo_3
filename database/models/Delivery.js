module.exports = (sequelize, DataTypes) =>{
    const Delivery = sequelize.define('Delivery',{
        id_delivery:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        status:DataTypes.STRING,
        fk_id_user_information:DataTypes.INTEGER
    },
    {
        tableName:'delivery',
        timestamps: false
    })

    Delivery.associate = (models) => {
        Delivery.belongsTo(models.User_information, {foreignKey:'fk_id_user_information',as:'user_information'})
        Delivery.hasMany(models.Payment, {foreignKey:'fk_id_delivery', as:'payment'})
     }

    return Delivery 
}