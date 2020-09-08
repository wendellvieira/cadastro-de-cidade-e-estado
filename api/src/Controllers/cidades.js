const Cidade = require("Models/cidade.js")
const Estado = require("Models/estado.js")

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
            const data = await new Cidade( req.body ).save()
            res.json( data )        
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    async update(req, res){
        try {
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
            const data = await Cidade.findByIdAndRemove({_id: req.params.id}, req.body)
            res.json({msg: "Cidade excluido com sucesso!"})

        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    async validacao(rules_validate, request) {
        try {
            const rules = {
                async nome({ req, res } ){
                    if( !/([a-z ]{3,})/i.test(req.body.nome) ) 
                        res.status(405).json("Nome inválido!")
                },
                async estado_id({ req, res } ){
                    if( !req.body.estado_id ) 
                            res.status(405).json("Data origatório!")
                    
                    const estado = await Estado.findById( req.body.estado_id )
                    if(!estado) res.status(404).json("o id do estado não foi encontrado!")
                        
                },
                async criado_em({ req, res } ){
                    try {
                        if( !req.body.criado_em ) 
                            res.status(405).json("Data origatório!")
    
                        const date = new Date(req.body.criado_em)
                        if( date == "Invalid Date" ) 
                            res.status(405).json("Data inválida!")
    
                    } catch (error) {
                        res.status(500).json(error)
                    }
                },
                async id({ req, res } ){
                    try {
                        if( !req.params.id ) 
                            res.status(405).json("Informe o id do estado!")

                        if( req.params.id != 'all' ){                            
                            const cidade = await Cidade.findById( req.params.id )
                            if(!cidade) res.status(404).json("cidade não encontrado!")
                        }
                        
                    } catch (error) {
                        res.status(500).json(error)
                    }
                }
            }

            const all_rules_promises = rules_validate.map( async rule => {
                if( !rules[rule] ) {
                    request.res.status(500).json("Regra de validação inexistente!")
                    return;
                }
                await rules[rule](request)
            } )
    
            await Promise.all( all_rules_promises )
    
            request.next()
        } catch (error) {
            request.res.status(500).json(error)
        }
        
    }


}

module.exports = new CidadeCtrl