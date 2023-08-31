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
        }
    };
    let config = {
        timestamps:true,
        paranoid:true,
        tableName: "Productos",
       
    }
    
    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models){
        Producto.belongsTo(models.Categorias, {
            as: "Categorias",
            foreignKey: "id_categoria"
        });
    
        Producto.hasMany(models.Imagenes, {
            as: "Imagenes",
            foreignKey: "id_producto"
        });
    
        Producto.belongsTo(models.Productos_tickets, {
            as: "Productos_tickets",
            foreignKey: "id" //id_producto < esto me da error asi que lo deje asi 
        });
    }
    
    return Producto;
}