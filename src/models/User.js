
const fs = require('fs')


const User = {
    filename : './src/database/usuarios.json',
    //Lee la base de datos
    getData : function (){
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'))
    },
    // Genera un id (sumando 1 al ultimo, en caso de que no haya ningun id le da el valor de 1)
    generateId : function (){
        let allUsers = this.findAll()
        let lastUser = allUsers.pop()
        if(lastUser){
            return lastUser.id + 1
        }
        return 1
    },
    //No entendi muy bien la diferencia pero me convenció el del video
    findAll : function (){
        return this.getData()
    },
    // Buscar por campo (se usa en el controlador de register)
    findByField : function (field, text){
        let allUsers = this.findAll()
        let userFound = allUsers.find(row => row[field] === text)
        return userFound
    },
    // Crear usuario y lo escribe en la Base de datos
    create : function (userData){
        let allUsers = this.findAll()
        let newUser = {
            id : this.generateId(),
            ...userData
        }
        allUsers.push(newUser)
        fs.writeFileSync(this.filename, JSON.stringify(allUsers, null, ' '))
        return newUser

    }
}


module.exports = User