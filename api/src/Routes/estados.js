const { Router } = require('express')

module.exports = app => {
    const routes = Router()

    routes.get("/", [])
    routes.post("/", [])
    routes.put("/:id", [])
    routes.delete("/:id", [])

    app.use( "/estados", routes )

}