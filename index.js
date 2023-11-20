const express = require("express");
const app = express();

const userRoute = require("./src/routes/user.route");

const port = 3000;

app.use(express.json());
app.use("/user", userRoute);

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
