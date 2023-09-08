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
        deletedAT:{
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
        Ticket.belongsToMany(models.Productos, { through: 'Productos_tickets' })
    }

    

    return Ticket;
}