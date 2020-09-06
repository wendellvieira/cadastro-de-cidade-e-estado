
const mongoose = require('mongoose')

const { Schema } = mongoose

const CidadeSchema = new Schema({
    nome: {
        type: String,
        require: true
    },
    estado_id: {
        type: ObjectId,
        require: true
    },
    criado_em: {
        type: Date,
        default: new Date
    },
    ultima_alteracao: {
        type: Date
    }
})

module.exports = mongoose.model( 'cidades', CidadeSchema )