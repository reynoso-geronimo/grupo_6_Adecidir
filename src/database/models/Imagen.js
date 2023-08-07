module.exports = (sequelize, dataTypes) => {
    let alias = "Imagenes";
    let cols = {
        id:{
         type: dataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
        },
        idProducto:{
         type: dataTypes.BIGINT
        }
        
    };
    let config = {
        tableName: "Imagenes",
        timestamps: false
    }
    
    const Imagen = sequelize.define(alias, cols, config);

    return Imagen;
}