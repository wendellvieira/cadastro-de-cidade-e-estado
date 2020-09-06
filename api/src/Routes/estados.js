const { Router } = require('express')
const EstadoCtrl = require('Controllers/estados.js')

module.exports = app => {
    const routes = Router()

   /**
    * @swagger
    * 
    * definitions:
    *   Estado:
    *     type: object
    *     require:
    *       - nome
    *       - abreviacao
    *     properties:
    *       name:
    *         type: string
    *       abreviacao:
    *         type: string
    *   
    *   EstadoRegistrado:
    *     type: object
    *     properties:
    *       _id:
    *         type: string
    *       name:
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
  *      description: Retorna um array de estados
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
  */

  /**
    * @swagger
    * 
    * /api/estados/{id}:
    *    get:
    *      description: Retorna um estado
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
    *      description: Cadastra um novo Estado
    *      responses:
    *        '200':
    *           description: Estado cadastrado com sucesso
    *           schema: 
    *             $ref: '#/definitions/EstadoRegistrado'
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
    *      description: Altera um Estado
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
    *      description: Excluí um Estado
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