const { Router } = require('express')
const EstadoCtrl = require('Controllers/estados.js')

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
    * /api/estados/all:
    *    get:
    *      tags: 
    *        - Estados
    *      summary: Retorna um array de estados
    *      responses:
    *        '200':
    *           description: OK
    *           schema:
    *             type: array
    *             items: 
    *               $ref: '#/definitions/EstadoRegistrado'
    *        '404':
    *           description: O usuário não foi encontrado
    *        '400':
    *           description: Erro por parte do cliente
    * 
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
    *      responses:
    *        '200':
    *           description: OK
    *           schema: 
    *             $ref: '#/definitions/EstadoRegistrado'
    *        '404':
    *           description: O usuário não foi encontrado
    *        '400':
    *           description: Erro por parte do cliente
    */
    routes.get("/:id", [
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
    *           description: Estado cadastrado com sucesso
    *           schema: 
    *             $ref: '#/definitions/Estado'
    *        '400':
    *           description: Erro ao cadastrar Estado
    */
    routes.post("/", [
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
    *           description: Estado salvo com sucesso
    *           schema: 
    *             $ref: '#/definitions/EstadoRegistrado'
    *        '400':
    *           description: Erro ao cadastrar Estado
    */
    routes.put("/:id", [
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
    *           description: Estado excluido com sucesso
    *        '400':
    *           description: Erro ao excluir Estado
    *        '406':
    *           description: Id não informado
    */
    routes.delete("/:id", [
        EstadoCtrl.delete  
    ])

    app.use( "/api/estados", routes )

}