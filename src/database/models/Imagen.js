module.exports = (sequelize, dataTypes) => {
    let alias = "Imagenes";
    let cols = {
        id:{
         type: dataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
        },
        nombre: {
            type:dataTypes.STRING
        },
        id_producto:{
         type: dataTypes.BIGINT
        }
        
    };
    let config = {
        tableName: "Imagenes",
        timestamps: false
    }
    
    const Imagen = sequelize.define(alias, cols, config);

    Imagen.associate = function(models){
        Imagen.belongsTo(models.Productos, {
            as: "Productos",
            foreignKey: "id_producto"
        })
    }

    return Imagen;
}