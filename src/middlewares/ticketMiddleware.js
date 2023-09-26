const db = require('../database/models')

module.exports = {
    isTicketOwner: async function (req, res, next) {
        if (req.session.usuarioLogeado) {
            try {
                const ticket = await db.Tickets.findByPk(req.params.id) 
                if (ticket.usuario_id===req.session.usuarioLogeado.id) {
                    next()
                }else{
                    res.redirect('/')
                }
                
           
            } catch (error) {
                
            }
        } else 
        res.redirect('/')
    }
    
    
}