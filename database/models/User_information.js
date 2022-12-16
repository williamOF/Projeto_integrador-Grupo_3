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
        telephone:DataTypes.STRING,
        birth_date:DataTypes.STRING,
        user_cpf:DataTypes.STRING,
        city:DataTypes.STRING,
        state:DataTypes.STRING,
        district:DataTypes.STRING,
        road:DataTypes.STRING,
        complements:DataTypes.STRING,
        fk_id_user:DataTypes.INTEGER,
    },
    {
        tableName: "user_information",
        timestamps: false
    })

    User_information.associate = ( models ) =>{
        User_information.belongsTo( models.Users ,{foreignKey: "fk_id_user", as:"users" })
        User_information.hasMany(models.Delivery, {foreignKey: 'fk_id_user_information', as: 'delivery'})
    }

    return User_information 
}