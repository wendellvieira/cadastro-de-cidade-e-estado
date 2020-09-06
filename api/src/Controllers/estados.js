const Estado = require("Models/estado.js")

class EstadoCtrl {
   async create(req, res){
        try {
            

            const data = await (new Estado( req.body )).save()
            res.json( data )        
        } catch (error) {
            res.status(400).json(error.message)
        }
   }
}

module.exports = new EstadoCtrl