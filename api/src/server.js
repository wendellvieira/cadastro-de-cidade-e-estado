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

    configureConsign(){
        const consign = require('consign')
        const ConsignSettings = require('Configs/ConsignSettings.js')
        consign(ConsignSettings).include('src/Routes').into(this.app)
    }

    configureSwagger(){
        const swaggerJsDoc = require("swagger-jsdoc")
        const swaggerUi = require("swagger-ui-express")
        const swaggerOptions = require('Configs/SwaggerOptions.js')
        
        const swaggerDocs = swaggerJsDoc(swaggerOptions)
        this.app.use( "/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs) )
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( `O Servidor estar online na porta ${this.port}` )
        })
    }

    init(){
        
        this.configureConsign()

        this.configureSwagger()

        return this
        
    }
}