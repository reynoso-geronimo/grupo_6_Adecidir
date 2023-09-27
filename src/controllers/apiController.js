const db = require("../database/models");
const { Op } = require("sequelize");

const Categorias = db.Categorias;
const Productos = db.Productos;
const Imagenes = db.Imagenes;

const apiController = {
  
  userList: async function (req, res) {
    let response={data:{}} 
    try {
      const usuarios = await db.Usuarios.findAll({});

       response.data = {
        count: usuarios.length,
        users: usuarios.map(usuario => {
          return {
            id: usuario.id,
            name: usuario.nombre,
            lastName: usuario.apellido,
            email: usuario.email,
            avatar:usuario.avatar,
            detail: "/api/users/"+ usuario.id,
          };
        }),
      };

      return res.json(response);
    } catch (error) {}
  },
  userDetail : async function (req, res){
    let response = {}
    try {
      const findUser = await db.Usuarios.findByPk(req.params.id,  {attributes:{exclude: ["password", "categoria",]}})
      response.data= findUser
      response.data.avatar =`/public/images/avatar/${findUser.avatar}`
      return res.json(response)
    }
    catch (error) {
      console.log(error)
    }
  },searchAllproductsAndQuantities: async function (req, res) {
    let response={data:{}};
    try{
      const [productos,categorias] = await Promise.all([Productos.findAll({include:[{association : "Imagenes"}, {association : "Categorias"}]}),Categorias.findAll({include:[{association : "Productos"}]}),])
      response.data.count=productos.length;
      response.data.countByCategory = {};
      categorias.forEach((categoria) => {
        response.data.countByCategory[categoria.nombre]= categoria.Productos.length        
      })
      response.data.products= productos.map((producto)=>{return{
        id:producto.id,
        name:producto.nombre,
        description:producto.descripcion,
        category:producto.Categorias,
        image:producto.Imagenes[0].nombre,
        detail: '/api/products/'+producto.id
      }})

      
      return res.json(response)
    }catch(e){
      response.msg="Hubo un error "+e
      return res.json(response)
    }
  },
  searchProduct:async function (req, res){
    let response = {data:{imagen:""}}
  
    try {
      const findProduct = await db.Productos.findByPk(req.params.id,{include:[{association : "Imagenes"}, {association : "Categorias"}, {
        model: db.Tickets,
        as: "Tickets",
        attributes: ["id"],
        through: {
          attributes: []
        }
      }]})
      response.data= findProduct
      response.data.imagen =`/public/images/productos/${findProduct.Imagenes[0].nombre}`
      
      return res.json(response)

   
    }
    catch (error) {
      response.msg="Hubo un error "+error
      return res.json(response)
    }
  },
  ticketList: async function (req, res) {
    let response={data:{}} 
    try {
      let tickets = await db.Tickets.findAll({});
     
       response.data = {count: tickets.length,};
       response.data.tickets= tickets.map( ticket => {
        return {
              id: ticket.id,
              user:ticket.usuario_id,
              state:ticket.estado,
              createdAt:ticket.createdAt,
              productos:[]
        };
        
      })
      for (const ticket of response.data.tickets) {
          ticket.productos= await db.Productos_tickets.findAll({where:{id_ticket:ticket.id}})
      }
      return res.json(response);
    } catch (error) {
      console.log(error)
      return res.json(error)
     
    }
  },
  ticketList2: async function (req,res){
    
    try {
      const tickets = await db.Tickets.findAll();

      const ticketDetails = await Promise.all(
        tickets.map(async ticket => {
          const products = await db.Productos_tickets.findAll({
            where: { id_ticket: ticket.id },
            include: [
              {
                model: db.Productos,
                as: "producto",
                attributes: ["id", "nombre"],paranoid:false
              },
            ],
            paranoid: false,});
          
          return {
            ticket: ticket,
            products: products,
          };
        })
      );
      res.json(ticketDetails)
    } catch (error) {
      console.log(error)
    }
    
  
  }
};

module.exports = apiController;
