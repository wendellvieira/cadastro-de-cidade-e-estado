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
    *        '404':
    *           description: Registro não encontrado
    *        '405':
    *           description: Dados incorretos
    *        '500':
    *           description: Erro do servidor
    */
    routes.get("/:id", [
      AuthApi,
      async (req, res, next) => await CidadeCtrl.validacao(
        ["id"], 
        {req, res, next}
      ),
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
      async (req, res, next) => await CidadeCtrl.validacao(
        ["nome", "estado_id"], 
        {req, res, next}
      ),
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
      async (req, res, next) => await CidadeCtrl.validacao(
        ["id", "nome", "estado_id", "criado_em"], 
        {req, res, next}
      ),
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
      async (req, res, next) => await CidadeCtrl.validacao(
        ["id"], 
        {req, res, next}
      ),
      CidadeCtrl.delete
    ])

    app.use( "/api/cidades", routes )
}