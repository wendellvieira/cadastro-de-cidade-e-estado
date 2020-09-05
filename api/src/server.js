module.exports = class Server {
    constructor(){
        const express = require('express')
        this.app = express()

        const bodyParser = require('body-parser')
        this.app.use( bodyParser.json() )

        const cors = require('cors')
        this.app.use( cors() )

        this.port = process.env.API_INT_PORT || 5000
    }

    init(){
        this.app.listen( this.port, () => {
            console.log(`O Servidor estar online na porta ${this.port}` )
        } )
    }
}