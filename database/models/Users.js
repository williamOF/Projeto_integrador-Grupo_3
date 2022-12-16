
const Users = (sequelize, DataTypes) =>{

    const Users = sequelize.define('Users',{
        id_user:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            unique:true
        },
        password:DataTypes.STRING,
        username:DataTypes.STRING,
        user_avatar:DataTypes.STRING
    })

    Users.associate = (models) => {
        Users.hasMany(models.Cred_card, { foreignKey: 'fk_id_user', as: 'card' })
        Users.hasMany(models.User_information, {foreignKey: 'fk_id_user', as: 'information'})
        Users.belongsToMany(models.Books, {
            as:'cart_item',
            through: 'cart',
            foreignKey:'fk_id_books',
            otherKey: 'fk_id_user',
            timestamps: false
        })
    }
  
    return Users
}

module.exports = Users