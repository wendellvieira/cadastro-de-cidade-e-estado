const request = require("supertest")
const Server = require("Src/server.js")
const API = (new Server)

const Cidade = require("Models/cidade.js")
const Estado = require("Models/estado.js")

describe("Integridade da api de cidades", () => {
    
    let id_cidade;
    let CidadeCriada;
    let IdCidadeCriadaPost;
    let defaultState = {
        nome: "Cidade Teste",
        estado_id: null        
    }

    beforeAll(async () => {
        await API.testInit()
        const newEstado = await new Estado({ nome: "Estado Teste", abreviacao: "ET"}).save()
        defaultState.estado_id = newEstado._id

        const newObj = await new Cidade(defaultState).save()
        CidadeCriada = { ...newObj.toJSON() }
    })

   
    describe("POST /api/cidades", () => {
        let resp; 
        let status;
        let defaultStatePost;

        beforeAll( async () => {
            defaultStatePost = {
                nome: "Cidade Teste Post",
                estado_id: CidadeCriada.estado_id
            }

            resp = await request( API.app )
                .post('/api/cidades')
                .send( defaultStatePost )
                .set({ 'x-api-key': process.env.WEB_SECRET }) 

            IdCidadeCriadaPost = resp.body._id
        })

        test("Verificar se o metodo retorna o status 200", () => {                 
            expect(resp.statusCode).toBe(200)       
        })
        test("Verifica se os o registro está integro", () => {                 
            expect(resp.body).toEqual( expect.objectContaining(defaultStatePost) )       
        })
    })

    describe("GET /api/cidades/all", () => {   
             
        test("Verifica o retorno da lista de usuários", async () => {        
            const { statusCode, body } = await request( API.app )
                .get('/api/cidades/all')
                .set({ 'x-api-key': process.env.WEB_SECRET }) 

            expect(statusCode).toBe(200)    
            expect( Array.isArray(body) ).toBeTruthy()
        })

        test("Verifica se consigo pegar um unico registro", async () => {
            const { _id, nome, estado_id } = CidadeCriada
            const { statusCode, body } = await request( API.app )
                .get(`/api/cidades/${_id}`)
                .set({ 'x-api-key': process.env.WEB_SECRET }) 

            expect( statusCode ).toBe(200)  
            expect( body ).toEqual( expect.objectContaining( { nome, estado_id} ) )
        })
    })

    describe("PUT /api/cidades", () => {  
        let resp;
        let newState
        beforeAll( async () => {
            newState = {
                nome: "Renamed City"
            }
            resp = await request( API.app )
                .put(`/api/cidades/${CidadeCriada._id}`)
                .send({ ...CidadeCriada, ...newState })
                .set({ 'x-api-key': process.env.WEB_SECRET }) 
        }) 

        test("Verificar se o metodo retorna o status 200", async () => {
            expect(resp.statusCode).toBe(200)       
        })
        test("Verifica se o update foi realizado", async () => {
            expect(resp.body).toEqual( expect.objectContaining( newState ) )       
        })
        test("Verifica se a data de alteração foi criada", async () => {
            expect(!!resp.body.ultima_alteracao).toBeTruthy()    
        })

    })

    describe("DELETE /api/cidades", () => {    

        test("Verificar se o metodo retorna o status 200", async () => { 
            const resp = await request( API.app )
                .delete(`/api/cidades/${CidadeCriada._id}`)
                .set({ 'x-api-key': process.env.WEB_SECRET }) 

            expect(resp.statusCode).toBe(200)       
        })
        
        test("Verificar se o foi realmente excluido", async () => { 
            const status = await Cidade.findById( CidadeCriada._id ) 
            expect( status ).toBeFalsy()
        })

    })
        
    afterAll( async (done) => {
        await Cidade.findByIdAndDelete( IdCidadeCriadaPost )
        await Estado.findByIdAndDelete( CidadeCriada.estado_id )            
        API.disconnectMongo()
        done()
    })

    
})
