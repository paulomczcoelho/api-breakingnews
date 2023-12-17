// const express = require("express");
// const connectDatabase = require("./src/database/db");
// const userRoute = require("./src/routes/user.route");

import express from "express";
import connectDatabase from "./database/db.js";
import dotenv from "dotenv";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import newsRoute from "./routes/news.route.js";
import swaggerRoute from "./routes/swagger.route.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/doc", swaggerRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

//ROUTE 3 itens
//Method HTTP - CRUD (CREATE, READ, UPDATE, DELETE)
//GET - pega infor
//POST - Cria uma info
//PUT - Altera toda a info
//PATH - Altera parte da info
//DELETE - Deleta uma info
//Name - Um indentificador da rota
//Function (Callback) -Responsavel por executar algum comando

// app.get("/", (req, res) => {
//   res.send("Hello World //3000");
// });
// app.get("/soma", (req, res) => {
//   const soma = 1 + 1;
//   res.send({ soma: soma });
//   //res.json(soma);
// });
