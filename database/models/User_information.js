module.exports = (sequelize, DataTypes) =>{
    const User_information = sequelize.define('User_information',{
        id_user_information:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        full_name:DataTypes.STRING,
        email:DataTypes.STRING,
        tellphone:DataTypes.STRING,
        birth_date:DataTypes.STRING,
        user_cpf:DataTypes.STRING,
        city:DataTypes.STRING,
        state:DataTypes.STRING,
        district:DataTypes.STRING,
        road:DataTypes.STRING,
        complements:DataTypes.STRING,
        users_id_user:DataTypes.INTEGER,
    },
    {
        tablename:'user_information',
        timeStamps: true
    })

    return User_information 
}