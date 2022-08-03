import "reflect-metadata";
import { config } from "dotenv";
import express from "express";
import { DataSource } from "typeorm";
import app from "../app";
import path from "path";
import { AppDataSource } from "../data-source";

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
    this._dataSource = await AppDataSource.initialize();
    this._app = app;
  }

  /**
   * Close server and DB connection
   */
  public async close(): Promise<void> {
    await this._dataSource.dropDatabase();
    await this._dataSource.destroy();
  }
}
