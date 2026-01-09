const dotenv = require("dotenv");
const app = require("./app");
const { connectDB } = require("./config/db");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});







const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Primtrade AI Backend API",
      version: "1.0.0",
      description: "Backend APIs for assignment demo",
    },
    servers: [
      { url: "http://localhost:5000/api/v1" }, 
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }], 
  },
  apis: ["./src/modules/**/*.js"], 
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
