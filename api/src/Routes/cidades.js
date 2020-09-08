const { Router } = require('express')
const CidadeCtrl = require('Controllers/cidades.js')
const AuthApi = require('Configs/AuthApi.js')

  /**
    * @swagger
    * 
    * tags:
    *   - name: Cidades
    *     description: Rotas para manipulação de cidades
    * 
    * definitions:
    * 
    *   Cidade:
    *     type: object
    *     properties:
    *       nome:
    *         type: string
    *       abreviacao:
    *         type: string
    *   
    *   CidadeRegistrada:
    *     type: object
    *     properties:
    *       _id:
    *         type: string
    *       nome:
    *         type: string
    *       estado_id:
    *         type: string
    *       criado_em:
    *         type: date
    *       ultima_alteracao:
    *         type: date
    *  
    */

module.exports = app => {
    const routes = Router()

    /**
    * @swagger
    * 
    * /api/cidades/{id}:
    *    get:
    *      summary: Retorna array de cidades
    *      parameters:
    *        - name: id
    *          description: Id do estado
    *          type: ObjectId
    *          default: all
    *      tags:
    *        - Cidades
    *      responses:
    *        '200':
    *           description: OK
    *           schema: 
    *             type: array
    *             $ref: '#/definitions/CidadeRegistrada'
    *        '400':
    *           description: Erro por parte do cliente
    */
    routes.get("/:id", [
      AuthApi,
      CidadeCtrl.getAll
    ])


  /**
    * @swagger
    * 
    * /api/cidades:
    *    post:
    *      summary: Cadastra uma nova cidades
    *      tags:
    *        - Cidades
    *      responses:
    *        '200':
    *           description: Cidade cadastrada com sucesso
    *           schema: 
    *             $ref: '#/definitions/Cidade'
    *        '400':
    *           description: Erro ao cadastrar Estado
    */
    routes.post("/", [
      AuthApi,
      CidadeCtrl.create
    ])
   
   
   /**
     * @swagger
     * 
     * /api/cidades:
     *    put:
     *      summary: Altera os dados de uma cidade
     *      parameters:
     *        - name: id
     *          description: Id do estado
     *          type: ObjectId
     *      tags:
     *        - Cidades
     *      responses:
     *        '200':
     *           description: Cidade alterada com sucesso
     *           schema: 
     *             $ref: '#/definitions/CidadeRegistrada'
     *        '406':
     *           description: Id não informado
     *        '400':
     *           description: Erro ao cadastrar Estado
     */
    routes.put("/:id", [
      AuthApi,
      CidadeCtrl.update
    ])
    
    
    
    /**
      * @swagger
      * 
      * /api/cidades:
      *    delete:
      *      summary: Excluí uma cidade
      *      parameters:
      *        - name: id
      *          description: Id do estado
      *          type: ObjectId
      *      tags:
      *        - Cidades
      *      responses:
      *        '200':
      *           description: Cidade alterada com sucesso
      *           schema: 
      *             $ref: '#/definitions/CidadeRegistrada'
      *        '406':
      *           description: Id não informado
      *        '400':
      *           description: Erro ao cadastrar Estado
      */
    routes.delete("/:id", [
      AuthApi,
      CidadeCtrl.delete
    ])

    app.use( "/api/cidades", routes )
}