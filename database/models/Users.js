
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

    return Users
}

module.exports = Users