const mongoose = require('mongoose')

const { Schema } = mongoose

const EstadoSchema = new Schema({
    nome: {
        type: String,
        require: true
    },
    abreviacao: {
        type: String,
        require: true,
        validate: {
            validator: val => /([a-z]{2})/i.test(val),
            message: props => `A abreviação do estado é composta por duas letras`
        }
    },
    criado_em: {
        type: Date,
        default: new Date
    },
    ultima_alteracao: {
        type: Date,
        default: new Date
    }
})

module.exports = mongoose.model( 'estados', EstadoSchema )