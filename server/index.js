const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Identity-Server-public-Endpoints",
            version: "1.0.0",
            description: "API "
        },
        servers: [
            {
                url: "http://localhost:" + process.env.PORT
            }
        ]
    },
    apis: ["./controllers/*.js"],
};

/*----------- SWAGGER --------------*/
const specs = swaggerJsDoc(options);
/*---------------------------------*/

const app = express();

/*----------- SWAGGER --------------*/
app.use("/indentity-server-public-endpoints", swaggerUI.serve, swaggerUI.setup(specs));
/*---------------------------------*/

app.set('port', process.env.PORT || 5000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*---------- ROUTES -----------------*/
app.use(require('./controllers'));
/*-----------------------------------*/

/*---------Init the server -------*/
app.listen(app.get('port'), () => { console.log('Server on port', app.get('port')); });