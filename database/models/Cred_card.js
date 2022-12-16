module.exports = (sequelize, DataTypes) =>{
    let Cred_card = sequelize.define('Cred_card',{
        id_cred_card:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        number:DataTypes.STRING,
        card_name:DataTypes.STRING,
        card_cv:DataTypes.STRING,
        card_validity:DataTypes.STRING,
        fk_id_user:DataTypes.INTEGER
    },
    {
        tableName:'cred_card',
        timestamps: false
    })

    Cred_card.associate = (models) => {
        Cred_card.belongsTo(models.Users, { foreignKey:'fk_id_user', as : 'users' })
    }

    return Cred_card 
}