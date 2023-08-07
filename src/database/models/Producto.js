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
         type: dataTypes.INT
        },
        talleS:{
         type: dataTypes.INT
        },
        talleM:{
         type: dataTypes.INT
        },
        talleL:{
         type: dataTypes.INT
        },
        talleXL:{
         type: dataTypes.INT
        },
        talleXXL:{
         type: dataTypes.INT
        },
        borrado:{
         type: dataTypes.STRING.BINARY
        },
        talleUnico:{
         type: dataTypes.INT
        }
    };
    let config = {
        tableName: "Productos",
        timestamps: false
    }
    
    const Producto = sequelize.define(alias, cols, config);

    return Producto;
}