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
                .send({ nome: "Estado teste", abreviacao: "ET" })
        
        Cidade.estado_id = body._id
    })


   
    describe("POST /api/cidades", () => {
        let resp; 
        let status;

        beforeAll( async () => {
            resp = await request( API.app )
                .post('/api/cidades')
                .send(Cidade)
            
            id_cidade = resp.body._id
        })

        test("Verificar se o metodo retorna o status 200", () => {                 
            expect(resp.statusCode).toBe(200)       
        })
        test("Verifica se os o registro está integro", () => {                 
            expect(resp.body).toEqual( expect.objectContaining(Cidade) )       
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
            const resp = await request( API.app ).delete(`/api/cidades/${id_cidade}`)       
            expect(resp.statusCode).toBe(200)       
        })
        
        test("Verificar se o foi realmente excluido", async () => { 
            const { statusCode } = await request( API.app ).get(`/api/cidades/${id_cidade}`)      
            expect( statusCode ).toBe(404)       
        })

    })
        
    afterAll( async (done) => {
        API.disconnectMongo();
        if(!!Cidade.estado_id) await request( API.app ).delete(`/api/estados/${Cidade.estado_id}`)
    })
})
