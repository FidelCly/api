import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import { TestDataSource } from "../test-data-source";
import { CardRepository } from "./card.repository";
import { ShopRepository } from "./shop.repository";
import { UserRepository } from "./user.repository";

export { CardRepository, UserRepository, ShopRepository };

export const getDataSource = (): DataSource => {
  return process.env.NODE_ENV === "test" ? TestDataSource : AppDataSource;
};
