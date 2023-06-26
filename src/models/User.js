const fs = require('fs');
const path = require('path');


const User = {
    getData: function () {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/usuarios.json"), "utf-8"))
    },
    generateId:() => {
        return Date.now()
    }
    ,
    findAll: function () {
        return this.getData()
    }
    ,
    findByPk: function (id) {

        return this.findAll().find(users => users.id == id)

    },
    findByField: function (key, value) {

        return this.findAll().find(users => users[key] == value)

    },
    createUsers: function (userData) {
        const allUsers = this.findAll()
        const newUser= {
            id:this.generateId(),
            ...userData,
            categoria:"Customer"
        }
      
        allUsers.push(newUser)
        fs.writeFileSync(path.resolve(__dirname, "../database/usuarios.json"), JSON.stringify(allUsers,null,2))
        return newUser
    },
    delete:function(id){
      
       
        const allUsers = this.findAll()
        allUsers.find(users => users.id == id).deleted=true
        fs.writeFileSync(path.resolve(__dirname, "../database/usuarios.json"), JSON.stringify(allUsers,null,2))
    }

}
module.exports= User
