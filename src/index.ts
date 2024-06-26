import express from "express";
import { AppDataSource } from "./data-source";
import router from "./routes/routes";
import cors from "cors";

const app = express();
const port = 4050;

AppDataSource.initialize().then(async () => {
  console.log("Conexão typeorm-postgres inicializada com sucesso.");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Content-Type", "*/*");
  cors({
    credentials: true,
    origin: true,
    exposedHeaders: "*",
    preflightContinue: false,
    methods: ["GET", "PUT", "POST", "DELETE"],
  });
  next();
});

app.use(express.json());

app.use(router);

app.listen(port);
