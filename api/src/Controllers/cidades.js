const Cidade = require("Models/cidade.js")

class CidadeCtrl {
    async getAll(req, res){
        try {
            let response;
            if( req.params.id == "all" ){
                response = await Cidade.find()
            }else{
                response = await Cidade.findById( req.params.id )
            }

            if(!response) res.status(404).json("Nenhum Cidade encontrado!")
            else res.json(response)  

        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    async create(req, res){
        try {
            const data = await (new Cidade( req.body )).save()
            res.json( data )        
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    async update(req, res){
        try {
            if( !req.params.id ) res.status(406).json("Falta o id do Cidade")
            const dataSave = {
                ...req.body,
                ultima_alteracao: Date.now()
            }
            const data = await Cidade.findByIdAndUpdate({_id: req.params.id}, dataSave, { new: true })
            res.json(data)
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    async delete(req, res){
        try {
            if( !req.params.id ) res.status(406).json("Falta o id do Cidade")
            const data = await Cidade.findByIdAndRemove({_id: req.params.id}, req.body)
            res.json({msg: "Cidade excluido com sucesso!"})

        } catch (error) {
            res.status(400).json(error.message)
        }
    }


}

module.exports = new CidadeCtrl