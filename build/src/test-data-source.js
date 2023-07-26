"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDataSource = void 0;
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.TestDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    migrationsRun: true,
    synchronize: true,
    logging: false,
    entities: [path_1.default.join(__dirname, "/entities/*.{ts,js}")],
    migrations: [path_1.default.join(__dirname, "/migrations/*.{ts,js}")],
    subscribers: [path_1.default.join(__dirname, "/subscribers/*.{ts,js}")],
});
//# sourceMappingURL=test-data-source.js.map