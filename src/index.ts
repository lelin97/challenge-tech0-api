import express from "express";
import { AppDataSource } from "./data-source";
import router from "./routes/routes";

const app = express();
const port = 4050;

AppDataSource.initialize().then(async () => {
  console.log("Conexão typeorm-postgres inicializada com sucesso.");

  app.use(express.json());

  // app.get("/", (req, res) => {
  //   return res.json("Funcionando");
  // });

  app.use(router);

  app.listen(port);
});

//   .catch((error) => {
//     console.log(
//       "Erro durante a inicialização da conexão typeorm-postres.",
//       error
//     );
