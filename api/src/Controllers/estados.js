const Estado = require("Models/estado.js")

class EstadoCtrl {
    async getAll(req, res){
        try {
            let response;
            if( req.params.id == "all" ){
                response = await Estado.find()
            }else{
                response = await Estado.findById( req.params.id )
            }

            if(!response) res.status(404).json("Nenhum estado encontrado!")
            else res.json(response)  

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

    async update(req, res){
        try {
            if( !req.params.id ) res.status(406).json("Falta o id do estado")
            const dataSave = {
                ...req.body,
                ultima_alteracao: Date.now()
            }
            const data = await Estado.findByIdAndUpdate({_id: req.params.id}, dataSave, { new: true })
            res.json(data)
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    async delete(req, res){
        try {
            if( !req.params.id ) res.status(406).json("Falta o id do estado")
            const data = await Estado.findByIdAndRemove({_id: req.params.id}, req.body)
            res.json({msg: "Estado excluido com sucesso!"})

        } catch (error) {
            res.status(400).json(error.message)
        }
    }


}

module.exports = new EstadoCtrl