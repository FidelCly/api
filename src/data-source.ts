import { config } from "dotenv";
import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [path.join(__dirname, "/entities/*.{ts,js}")],
  migrations: [path.join(__dirname, "/migrations/*.{ts,js}")],
  subscribers: [path.join(__dirname, "/subscribers/*.{ts,js}")],
});
