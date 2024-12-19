const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Swagger config
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', //OpenAPI version
        info: {
            title: 'User API', //API title
            version: '1.0.0', //This will be our API version
            description: 'A simple API for managing users'
        },

        servers: [
            {url: 'http://localhost:3000'}, //local server
            {url: 'https://express-middleware-demo-bee4a4a41359.herokuapp.com'}
        ],
    },

    apis:['./routes/*.js']//Path created for API documentation
    
};

const swaggerDocs = swaggerJsDoc(swaggerJsDoc);

module.exports = {swaggerUi, swaggerDocs};