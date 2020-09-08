module.exports = class Server {
    constructor(){
        const express = require('express')
        this.app = express()

        const bodyParser = require('body-parser')
        this.app.use( bodyParser.json() )
        this.app.use( bodyParser.urlencoded({ extended: true }) )

        const cors = require('cors')
        this.app.use( cors() )        

        this.mongo = require('Configs/MongoConnect.js')
       
        this.port = process.env.API_INT_PORT || 5000
    }

    async configureConsign(){
        const consign = require('consign')
        const ConsignSettings = require('Configs/ConsignSettings.js')
        consign(ConsignSettings)
            .include('src/Routes')
            .into(this.app)
    }

    configureSwagger(){
        const swaggerJsDoc = require("swagger-jsdoc")
        const swaggerUi = require("swagger-ui-express")
        const swaggerOptions = require('Configs/SwaggerOptions.js')
        const swaggerDocs = swaggerJsDoc(swaggerOptions)
        this.app.use( "/", swaggerUi.serve, swaggerUi.setup(swaggerDocs) )
    }

    async iniciandoMongo(){
        await this.mongo.connect()
    }

    async disconnectMongo(){
        await this.mongo.disconnect()
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( `O Servidor estar online na porta ${this.port}` )
        })
    }

    init(){
        
        this.configureConsign()

        this.configureSwagger()

        this.iniciandoMongo()

        return this
        
    }

    async testInit(){
        await this.configureConsign()

        await this.iniciandoMongo()

        return this
    }
}