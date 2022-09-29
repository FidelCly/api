import "reflect-metadata";
import { config } from "dotenv";
import express from "express";
import { DataSource } from "typeorm";
import app from "../app";
import path from "path";
import { Card, Shop, User } from "../entities";
import {
  CardRepository,
  ShopRepository,
  UserRepository,
} from "../repositories";
import { userFixture } from "./seeds/user.seed";
import { shopFixture } from "./seeds/shop.seed";
import { cardFixture } from "./seeds/card.seed";
import { TestDataSource } from "../test-data-source";

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
    config({ path: path.join(__dirname, "../.env") });
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
    this.seedUser();
    this.seedShop();
    this.seedCard();
  }

  /**
   * Seed user
   */
  public async seedUser(): Promise<void> {
    const user: User = new User();
    Object.assign(user, userFixture);
    await UserRepository.save(user);
  }

  /**
   * Seed shop
   */
  public async seedShop(): Promise<void> {
    const shop: Shop = new Shop();
    Object.assign(shop, shopFixture);
    await ShopRepository.save(shop);
  }

  /**
   * Seed card
   */
  public async seedCard(): Promise<void> {
    const card: Card = new Card();
    Object.assign(card, cardFixture);
    card.startAt = new Date(cardFixture.startAt);
    card.endAt = new Date(cardFixture.endAt);
    await CardRepository.save(card);
  }
}
