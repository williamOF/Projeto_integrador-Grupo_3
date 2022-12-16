module.exports = (sequelize, DataTypes) =>{
    let Cart = sequelize.define('Cart',{
        id_cart:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        qtd_items:DataTypes.INTEGER,
        type_selected:DataTypes.STRING,
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