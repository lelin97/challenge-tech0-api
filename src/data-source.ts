import { DataSource } from "typeorm";
import "dotenv/config";
import "reflect-metadata";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/**/models/*.{ts,js}`],
  synchronize: true,
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
