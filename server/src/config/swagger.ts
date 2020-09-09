import { app } from "..";
import path from "path";

const expressSwagger = require("express-swagger-generator")(app);

const apiPath = path.join(process.cwd(), "src", "routes");

const options = {
    swaggerDefinition: {
        info: {
            title: "San Cesario backend API",
            description: "Backend API for San Cesario sul Panaro website",
            version: "1.0"
        },
        host: "localhost:3000",
        basePath: "/api",
        produces: ["application/json"],
        schemes: ["http", "https"]
    },
    basedir: __dirname, //app absolute path
    files: [apiPath + "/*.ts"] //Path to the API handle folder
};

expressSwagger(options);
