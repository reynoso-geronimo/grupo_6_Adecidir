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
         type: dataTypes.INTEGER
        },
        talle:{
          type: dataTypes.STRING
        }
       
    };
    let config = {
        tableName: "Productos_tickets",
        timestamps: false
    }
    
    const Producto_ticket = sequelize.define(alias, cols, config);

    Producto_ticket.associate = function(models) {
        Producto_ticket.belongsTo(models.Productos, {
          foreignKey: 'id_producto', // Asegúrate de que sea la clave correcta
          as: 'producto', // Alias correcto
        });
      
        Producto_ticket.belongsTo(models.Tickets, {
          foreignKey: 'id_ticket', // Asegúrate de que sea la clave correcta
          as: 'ticket', // Alias correcto
        });
      };
    return Producto_ticket;
}