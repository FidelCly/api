import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import { CardRepository } from "./card.repository";
import { ShopRepository } from "./shop.repository";
import { UserRepository } from "./user.repository";
import { PromotionRepository } from "./promotion.repository";
import { BalanceRepository } from "./balance.repository";

export {
  CardRepository,
  UserRepository,
  ShopRepository,
  PromotionRepository,
  BalanceRepository,
};

export const getDataSource = (): DataSource => {
  return AppDataSource;
};
