"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    migrationsRun: true,
    synchronize: false,
    logging: false,
    entities: [path_1.default.join(__dirname, "/entities/*.{ts,js}")],
    migrations: [path_1.default.join(__dirname, "/migrations/*.{ts,js}")],
    subscribers: [path_1.default.join(__dirname, "/subscribers/*.{ts,js}")],
});
//# sourceMappingURL=data-source.js.map