module.exports = (sequelize, dataTypes) => {
    let alias = "Categorias";
    let cols = {
        id:{
         type: dataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
        },
        nombre:{
         type: dataTypes.STRING
        },
        imagen:{
         type: dataTypes.STRING
        }
       
    };
    let config = {
        tableName: "Categorias",
        timestamps: false
    }
    
    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(models){
        Categoria.hasMany(models.Productos, {
            as: "Productos",
            foreignKey: "id_categoria"
        })
    }

    return Categoria;
}