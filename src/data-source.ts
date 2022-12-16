import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  migrationsRun: true,
  synchronize: false,
  logging: false,
  entities: [path.join(__dirname, "/entities/*.{ts,js}")],
  migrations: [path.join(__dirname, "/migrations/*.{ts,js}")],
  subscribers: [path.join(__dirname, "/subscribers/*.{ts,js}")],
});
