module.exports = class Server {
    constructor(){
        const express = require('express')
        this.app = express()
        
        this.port = process.env.API_INT_PORT || 5000
    }

    init(){
        this.app.listen( this.port, () => {
            console.log(`O Servidor estar online na porta ${this.port}` )
        } )
    }
}