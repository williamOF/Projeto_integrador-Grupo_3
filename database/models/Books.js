
module.exports = (sequelize, DataTypes) =>{

    const Books = sequelize.define('Books',{
        id_books:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        title:DataTypes.STRING,
        author:DataTypes.STRING,
        publishing_company:DataTypes.STRING,
        edition:DataTypes.STRING,
        synopsis:DataTypes.STRING,
        front_cover:DataTypes.STRING,
        genre:DataTypes.STRING,
        kindle_price:DataTypes.STRING,
        common_price:DataTypes.STRING,
        special_price:{
            type:DataTypes.STRING,
            allowNull:true
        },
        publication_date:DataTypes.STRING,
        dimensions:DataTypes.STRING,
        number_pages:DataTypes.STRING,
        inventory:DataTypes.STRING,
        language:DataTypes.STRING,
    },
    {
        tablename: 'books',
        timeStamps: true
    })

    return Books
}
