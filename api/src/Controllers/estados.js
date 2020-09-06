const Estado = require("Models/estado.js")

class EstadoCtrl {
    async getAll(req, res){
        try {
            const estados = await Estado.find()
            if(!estados) res.status(404).json("Nenhum estado encontrado!")
            else res.json(estados)            
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

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