// import { Router } from "express";
// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "../swagger.json" assert { type: "json" };

// const swaggerRouter = Router();

// swaggerRouter.use("/", swaggerUi.serve);
// swaggerRouter.get("/", swaggerUi.setup(swaggerDocument));

// export default swaggerRouter;

//______________ config para rodar local____________//

const router = require("express").Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

module.exports = router;
