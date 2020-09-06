const { Router } = require('express')
const EstadoCtrl = require('Controllers/estados.js')

module.exports = app => {
    const routes = Router()

    routes.get("/:id", [
        EstadoCtrl.getAll
    ])


    routes.post("/", [
        EstadoCtrl.create
    ])

    routes.put("/:id", [
        EstadoCtrl.update        
    ])
    
    routes.delete("/:id", [
        EstadoCtrl.delete  
    ])

    app.use( "/api/estados", routes )

}