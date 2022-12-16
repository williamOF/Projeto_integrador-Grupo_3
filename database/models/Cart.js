module.exports = (sequelize, DataTypes) =>{
    let Cart = sequelize.define('Cart',{
        id_cart:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        fk_id_books:DataTypes.INTEGER,
        fk_id_user:DataTypes.INTEGER
    },
    {
        tableName:'cart',
        timestamps: false
    })

 
    return Cart 
}