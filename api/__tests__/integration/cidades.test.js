const request = require("supertest")
const Server = require("Src/server.js")
const API = (new Server)

describe("Integridade da api de cidades", () => {
    
    let id_cidade;
    const Cidade = {
        nome: "Itaboraí",
        estado_id: null        
    }

    beforeAll(async () => {
        await API.testInit()
        const { body } =  await request( API.app )
                .post('/api/estados')
                .send({ nome: "Rio de janeiro", abreviacao: "ET" })
                .set({ 'x-api-key': process.env.WEB_SECRET }) 
        
        Cidade.estado_id = body._id
    })

   
    describe("POST /api/cidades", () => {
        let resp; 
        let status;

        beforeAll( async () => {
            resp = await request( API.app )
                .post('/api/cidades')
                .send(Cidade)
                .set({ 'x-api-key': process.env.WEB_SECRET }) 
            
            id_cidade = resp.body._id
        })

        test("Verificar se o metodo retorna o status 200", () => {                 
            expect(resp.statusCode).toBe(200)       
        })
        test("Verifica se os o registro está integro", () => {                 
            expect(resp.body).toEqual( expect.objectContaining(Cidade) )       
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
            const { statusCode, body } = await request( API.app )
                .get(`/api/cidades/${id_cidade}`)
                .set({ 'x-api-key': process.env.WEB_SECRET }) 

            expect(statusCode).toBe(200)  
            expect( body ).toEqual( expect.objectContaining({ ...Cidade, _id: id_cidade }) )
        })
    })

    describe("PUT /api/cidades", () => {  
        let resp;
        const newState = {
            nome: "Volta redonda"
        }
        beforeAll( async () => {
            resp = await request( API.app )
                .put(`/api/cidades/${id_cidade}`)
                .send(newState)
                .set({ 'x-api-key': process.env.WEB_SECRET }) 
        }) 

        test("Verificar se o metodo retorna o status 200", async () => {
            expect(resp.statusCode).toBe(200)       
        })
        test("Verifica se o update foi realizado", async () => {
            expect(resp.body).toEqual( expect.objectContaining({ ...newState,  _id: id_cidade }) )       
        })
        test("Verifica se a data de alteração foi criada", async () => {
            expect(!!resp.body.ultima_alteracao).toBeTruthy()    
        })

    })

    describe("DELETE /api/cidades", () => {    

        test("Verificar se o metodo retorna o status 200", async () => { 
            const resp = await request( API.app )
                .delete(`/api/cidades/${id_cidade}`)
                .set({ 'x-api-key': process.env.WEB_SECRET }) 

            expect(resp.statusCode).toBe(200)       
        })
        
        test("Verificar se o foi realmente excluido", async () => { 
            const { statusCode } = await request( API.app )
                .get(`/api/cidades/${id_cidade}`)   
                .set({ 'x-api-key': process.env.WEB_SECRET }) 

            expect( statusCode ).toBe(404)       
        })

    })
        
    afterAll( async (done) => {
        await request( API.app )
            .delete(`/api/estados/${Cidade.estado_id}`)
            .set({ 'x-api-key': process.env.WEB_SECRET }) 
            
        API.disconnectMongo()
        done()
    })

    
})
