module.exports = (sequelize, dataTypes) => {
    let alias = "Tickets";
    let cols = {
        id:{
         type: dataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
        },
        createdAt:{
         type: dataTypes.DATE
        },
        usuario_id:{
         type: dataTypes.BIGINT
        },
        estado:{
        type: dataTypes.STRING
        },
        deletedAt:{
            type: dataTypes.DATE
           }
        
    };
    let config = {
        tableName: "Tickets",
        timestamps: true
    }
    
    const Ticket = sequelize.define(alias, cols, config);

    Ticket.associate = function(models){
        
        Ticket.belongsTo(models.Usuarios, {
            as: "Usuarios",
            foreignKey: "usuario_id"
        })
        Ticket.belongsToMany(models.Productos, {
            as: 'Productos', 
            through: 'Productos_tickets',
            foreignKey: 'id_ticket',
            otherKey: 'id_producto',
          });
    }

    

    return Ticket;
}