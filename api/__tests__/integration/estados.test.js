const request = require("supertest")
const Server = require("Src/server.js")
const Estado = require("Models/estado.js")
const API = (new Server)

describe("Integridade da api de estados", () => {
    
    
    let estado_criado;
    const defaultState = {
        nome: "Teste Automatizado",
        abreviacao: "TA"    
    }
    
    beforeAll(async () => {
        await API.testInit()
        const newEstado = await new Estado(defaultState).save()
        estado_criado = { ...newEstado.toJSON() }
    })

    describe("POST /api/estados", () => {
        let resp; 
        const dataEstado = {
            nome: "Rio de Janeiro",
            abreviacao: "RJ"        
        }

        beforeAll( async () => {
            resp = await request( API.app )
                .post('/api/estados')
                .send(dataEstado)
                .set({ 'x-api-key': process.env.WEB_SECRET })
        })

        test("Verificar se o metodo retorna o status 200", () => {                 
            expect(resp.statusCode).toBe(200)       
        })
        test("Verifica se os o registro está integro", () => {                 
            expect(resp.body).toEqual( expect.objectContaining(dataEstado) )       
        })

        afterAll( async (done) => {
            await Estado.findByIdAndRemove(resp.body._id)
            done()
        })

    })

    describe("GET /api/estados/:id", () => {   
             
        test("Verifica o retorno da lista de usuários", async () => {        
            const { statusCode, body } = await request( API.app )
                .get('/api/estados/all')
                .set({ 'x-api-key': process.env.WEB_SECRET })

            expect(statusCode).toBe(200)    
            expect( Array.isArray(body) ).toBeTruthy()
        })

        test("Verifica se consigo pegar um unico registro", async () => {
            const { statusCode, body } = await request( API.app )
                .get(`/api/estados/${estado_criado._id}`)
                .set({ 'x-api-key': process.env.WEB_SECRET })

            expect(statusCode).toBe(200)  
            expect( body ).toEqual( expect.objectContaining( defaultState ) )
        })
    })

    describe("PUT /api/estados", () => {  
        let resp;
        let newState = {
            nome: "São paulo",
            abreviacao: "SP"
        }
        
        beforeAll( async () => {
           
            resp = await request( API.app )
                .put(`/api/estados/${estado_criado._id}`)
                .send({ ...estado_criado, ...newState })
                .set({ 'x-api-key': process.env.WEB_SECRET })
        }) 

        test("Verificar se o metodo retorna o status 200", async () => {
            expect(resp.statusCode).toBe(200)       
        })
        test("Verifica se o update foi realizado", async () => {
            expect(resp.body).toEqual( expect.objectContaining(newState) )       
        })
        test("Verifica se a data de alteração foi criada", async () => {
            expect(!!resp.body.ultima_alteracao).toBeTruthy()    
        })

    })

    describe("DELETE /api/estados", () => {    

        test("Verificar se o metodo retorna o status 200", async () => { 
            const resp = await request( API.app )
                .delete(`/api/estados/${estado_criado._id}`)
                .set({ 'x-api-key': process.env.WEB_SECRET })       
            expect(resp.statusCode).toBe(200)       
        })
        
        test("Verificar se o foi realmente excluido", async () => { 
            const { statusCode } = await request( API.app )
                .get(`/api/estados/${estado_criado._id}`)
                .set({ 'x-api-key': process.env.WEB_SECRET })   

            expect( statusCode ).toBe(404)       
        })

    })
        
    afterAll( async (done) => {
        await API.disconnectMongo()
        done()
    })
})
