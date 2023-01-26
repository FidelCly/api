import "reflect-metadata";
import { config } from "dotenv";
import express from "express";
import { DataSource } from "typeorm";
import app from "../app";
import path from "path";
import { TestDataSource } from "../test-data-source";

import { Card, Promotion, Shop, User, Balance } from "../entities";
import {
  CardRepository,
  PromotionRepository,
  ShopRepository,
  UserRepository,
  BalanceRepository,
} from "../repositories";
import {
  userFixture,
  shopFixture,
  cardFixture,
  promotionFixture,
  balanceFixture,
} from "./seeds";
import {
  IBalanceCreatePayload,
  ICardCreatePayload,
  IPromotionCreatePayload,
  IShopCreatePayload,
  IUserCreatePayload,
} from "../payloads";

export class TestFactory {
  private _app: express.Application;
  private _dataSource: DataSource;

  public get app(): express.Application {
    return this._app;
  }

  public get dataSource(): DataSource {
    return this._dataSource;
  }

  /**
   * Connect to DB and start server
   */
  public async init(): Promise<void> {
    process.env.NODE_ENV = "test";
    config({ path: path.join(__dirname, "../.env.test") });
    this._dataSource = await TestDataSource.initialize();
    this._app = app;
  }

  /**
   * Close server and DB connection
   */
  public async close(): Promise<void> {
    await this._dataSource.dropDatabase();
    await this._dataSource.destroy();
  }

  /**
   * Seed db
   */
  public async seed(): Promise<void> {
    await this.seedUser();
    await this.seedShop();
    await this.seedCard();
    await this.seedPromotion();
    await this.seedBalance();
  }

  /**
   * Seed user
   */
  public async seedUser(_user?: IUserCreatePayload): Promise<void> {
    const user: User = new User();
    Object.assign(user, _user ?? userFixture);
    await UserRepository.save(user);
  }

  /**
   * Seed shop
   */
  public async seedShop(_shop?: IShopCreatePayload): Promise<void> {
    const shop: Shop = new Shop();
    Object.assign(shop, _shop ?? shopFixture);
    await ShopRepository.save(shop);
  }

  /**
   * Seed card
   */
  public async seedCard(_card?: ICardCreatePayload): Promise<void> {
    const card: Card = new Card();
    Object.assign(card, _card ?? cardFixture);
    await CardRepository.save(card);
  }

  /**
   * Seed promotion
   */
  public async seedPromotion(
    _promotion?: IPromotionCreatePayload
  ): Promise<void> {
    const promotion: Promotion = new Promotion();
    Object.assign(promotion, _promotion ?? promotionFixture);
    await PromotionRepository.save(promotion);
  }

  /**
   * Seed balance
   */
  public async seedBalance(_balance?: IBalanceCreatePayload): Promise<void> {
    const balance: Balance = new Balance();
    Object.assign(balance, _balance ?? balanceFixture);
    await BalanceRepository.save(balance);
  }
}
