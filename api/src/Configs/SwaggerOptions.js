module.exports = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Crud Cidades e estados API",
        description: "Este é um CRUD para o cadastro de cidades e estados.",
        contact: {
          name: "Wendell Vieira da Cunha",
          email: "wendell.vieiracunha@gmail.com"
        },
        servers: [
            process.env.API_URL || "http://localhost:5000"
        ]
      }
    },
    apis: [
        "./src/Routes/*.js"
    ]
  }