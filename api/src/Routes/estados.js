const { Router } = require('express')
const EstadoCtrl = require('Controllers/estados.js')

module.exports = app => {
    const routes = Router()

    routes.get("/", [])
    routes.post("/", [
        EstadoCtrl.create
    ])
    routes.put("/:id", [])
    routes.delete("/:id", [])

    app.use( "/api/estados", routes )

}