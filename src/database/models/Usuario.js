const bcryptjs = require('bcryptjs');

module.exports = (sequelize, dataTypes) => {
    let alias = "Usuarios";
    let cols = {
        id: {
            type: dataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING
        },
        nombre: {
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING,
            set(value) {
              this.setDataValue('password', bcryptjs.hashSync(value,10));
            }
          },
        categoria: {
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.STRING
        },
        direccion: {
            type: dataTypes.STRING
        },
        telefono: {
            type: dataTypes.INTEGER
        }

    };
    let config = {
        tableName: "Usuarios",
        timestamps: false
    }

    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(models){
        Usuario.hasMany(models.Tickets, {
            as: "Tickets",
            foreignKey: "usuario_id"
        })
    }

    return Usuario;
}