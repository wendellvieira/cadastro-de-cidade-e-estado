const { Router } = require('express')
const EstadoCtrl = require('Controllers/estados.js')
const AuthApi = require('Configs/AuthApi.js')

module.exports = app => {
    const routes = Router()

   /**
    * @swagger
    * tags:
    *   - name: Estados
    *     description: Rotas para manipulação de estados
    * 
    * 
    * definitions:
    *   Estado:
    *     type: object
    *     properties:
    *       nome:
    *         type: string
    *       abreviacao:
    *         type: string
    *   
    *   EstadoRegistrado:
    *     type: object
    *     properties:
    *       _id:
    *         type: string
    *       nome:
    *         type: string
    *       abreviacao:
    *         type: string
    *       criado_em:
    *         type: date
    *       ultima_alteracao:
    *         type: date
    *  
    */



  /**
    * @swagger
    * 
    * /api/estados/{id}:
    *    get:
    *      tags:
    *        - Estados
    *      summary: Retorna um estado
    *      parameters:
    *        - name: id
    *          description: Id do estado
    *          type: ObjectId
    *          default: all
    *      responses:
    *        '200':
    *           description: OK
    *        '404':
    *           description: Registro não encontrado
    *        '405':
    *           description: Dados incorretos
    *        '500':
    *           description: Erro do servidor
    */
    routes.get("/:id", [
        AuthApi,
        async (req, res, next) => await EstadoCtrl.validacao(
            ["id"], 
            {req, res, next}
        ),       
        EstadoCtrl.getAll
    ])


   /**
    * @swagger
    * 
    * /api/estados:
    *    post:
    *      summary: Cadastra um novo Estado
    *      tags:
    *        - Estados
    *      responses:
    *        '200':
    *           description: OK
    *        '404':
    *           description: Registro não encontrado
    *        '405':
    *           description: Dados incorretos
    *        '500':
    *           description: Erro do servidor
    */
    routes.post("/", [
        AuthApi,
        async (req, res, next) => await EstadoCtrl.validacao(
            ["nome", "abreviacao"], 
            {req, res, next}
        ),
        EstadoCtrl.create
    ])



  /**
    * @swagger
    * 
    * /api/estados/{id}:
    *    put:
    *      summary: Altera um Estado
    *      tags:
    *        - Estados
    *      parameters:
    *        - name: id
    *          description: Id do estado
    *          type: ObjectId
    *      responses:
    *        '200':
    *           description: OK
    *        '404':
    *           description: Registro não encontrado
    *        '405':
    *           description: Dados incorretos
    *        '500':
    *           description: Erro do servidor
    */
    routes.put("/:id", [
        AuthApi,
        async (req, res, next) => await EstadoCtrl.validacao(
            ["id", "nome", "abreviacao", "criado_em"], 
            {req, res, next}
        ),
        EstadoCtrl.update        
    ])



    /**
    * @swagger
    * 
    * /api/estados/{id}:
    *    delete:
    *      summary: Excluí um Estado
    *      tags: 
    *        - Estados
    *      parameters:
    *        - name: id
    *          description: Id do estado
    *          type: ObjectId
    *      responses:
    *        '200':
    *           description: OK
    *        '404':
    *           description: Registro não encontrado
    *        '405':
    *           description: Dados incorretos
    *        '500':
    *           description: Erro do servidor
    */
    routes.delete("/:id", [
        AuthApi,
        async (req, res, next) => await EstadoCtrl.validacao( ["id"], {req, res, next} ),
        EstadoCtrl.delete  
    ])

    app.use( "/api/estados", routes )

}