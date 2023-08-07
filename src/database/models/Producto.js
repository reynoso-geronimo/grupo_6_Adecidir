module.exports = (sequelize, dataTypes) => {
    let alias = "Productos";
    let cols = {
        id:{
         type: dataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
        },
        nombre:{
         type: dataTypes.STRING
        },
        descripcion:{
         type: dataTypes.TEXT
        },
        id_categoria:{
         type: dataTypes.BIGINT
        },
        precio:{
         type: dataTypes.FLOAT
        },
        talleXS:{
         type: dataTypes.INTEGER
        },
        talleS:{
         type: dataTypes.INTEGER
        },
        talleM:{
         type: dataTypes.INTEGER
        },
        talleL:{
         type: dataTypes.INTEGER
        },
        talleXL:{
         type: dataTypes.INTEGER
        },
        talleXXL:{
         type: dataTypes.INTEGER
        },
       
        talleUnico:{
         type: dataTypes.INTEGER
        },
        deletedAT:{
            type: dataTypes.DATE
           },
    };
    let config = {
        tableName: "Productos",
        timestamps: false
    }
    
    const Producto = sequelize.define(alias, cols, config);

    return Producto;
}