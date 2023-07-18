const outputFile = '../swagger_output.json'
const endpointsFiles = ['./src/router.ts']
const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: "API em Express com Swagger",
    version: "1.0.0",
    description:
      "Este é uma API simples feito com Express e documentado com Swagger",
    contact: {
      name: "Armando Pereira",
      email: "armando.pereira@sp.senai.br",
    },
  },
  host: "localhost:3001",
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index.ts')
})



