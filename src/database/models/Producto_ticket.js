module.exports = (sequelize, dataTypes) => {
    let alias = "Productos_tickets";
    let cols = {
        id:{
         type: dataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
        },
        id_producto:{
         type: dataTypes.BIGINT
        },
        precioFechaCompra:{
         type: dataTypes.FLOAT
        },
        id_ticket:{
         type: dataTypes.BIGINT
        },
        cantidad:{
         type: dataTypes.BOOLEAN
        }
       
    };
    let config = {
        tableName: "Productos_tickets",
        timestamps: false
    }
    
    const Producto_ticket = sequelize.define(alias, cols, config);

    return Producto_ticket;
}