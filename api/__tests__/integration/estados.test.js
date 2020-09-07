const request = require("supertest")
const Server = require("Src/server.js")
const API = (new Server)

describe("Integridade da api de estados", () => {
    beforeAll(async () => {
        await API.testInit()
    })

    let id_estado;
    const Estado = {
        nome: "Rio de Janeiro",
        abreviacao: "RJ"        
    }

   
    describe("POST /api/estados", () => {
        let resp; 
        let status;

        beforeAll( async () => {
            resp = await request( API.app )
                .post('/api/estados')
                .send(Estado)
            
            id_estado = resp.body._id
        })

        test("Verificar se o metodo retorna o status 200", () => {                 
            expect(resp.statusCode).toBe(200)       
        })
        test("Verifica se os o registro está integro", () => {                 
            expect(resp.body).toEqual( expect.objectContaining(Estado) )       
        })
    })

    describe("GET /api/estados/:id", () => {   
             
        test("Verifica o retorno da lista de usuários", async () => {        
            const { statusCode, body } = await request( API.app ).get('/api/estados/all')
            expect(statusCode).toBe(200)    
            expect( Array.isArray(body) ).toBeTruthy()
        })

        test("Verifica se consigo pegar um unico registro", async () => {
            const { statusCode, body } = await request( API.app ).get(`/api/estados/${id_estado}`)
            expect(statusCode).toBe(200)  
            expect( body ).toEqual( expect.objectContaining({ ...Estado, _id: id_estado }) )
        })
    })

    describe("PUT /api/estados", () => {  
        let resp;
        const newState = {
            nome: "São paulo",
            abreviacao: "SP"
        }
        beforeAll( async () => {
            resp = await request( API.app )
                .put(`/api/estados/${id_estado}`)
                .send(newState)
        }) 

        test("Verificar se o metodo retorna o status 200", async () => {
            expect(resp.statusCode).toBe(200)       
        })
        test("Verifica se o update foi realizado", async () => {
            expect(resp.body).toEqual( expect.objectContaining({ ...newState,  _id: id_estado }) )       
        })
        test("Verifica se a data de alteração foi criada", async () => {
            expect(!!resp.body.ultima_alteracao).toBeTruthy()    
        })

    })

    describe("DELETE /api/estados", () => {    

        test("Verificar se o metodo retorna o status 200", async () => { 
            const resp = await request( API.app ).delete(`/api/estados/${id_estado}`)       
            expect(resp.statusCode).toBe(200)       
        })
        
        test("Verificar se o foi realmente excluido", async () => { 
            const { statusCode } = await request( API.app ).get(`/api/estados/${id_estado}`)      
            expect( statusCode ).toBe(404)       
        })

    })
        
    afterAll( async (done) => {
        await API.disconnectMongo()
        done()
    })
})
