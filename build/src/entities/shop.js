"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Shop = class Shop {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Shop.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Shop.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(9, 9),
    (0, typeorm_1.Column)({
        length: 9,
    }),
    __metadata("design:type", String)
], Shop.prototype, "siren", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(14, 14),
    (0, typeorm_1.Column)({
        length: 14,
    }),
    __metadata("design:type", String)
], Shop.prototype, "siret", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Shop.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPostalCode)("FR"),
    (0, class_validator_1.Length)(5, 5),
    (0, typeorm_1.Column)({
        length: 5,
    }),
    __metadata("design:type", String)
], Shop.prototype, "zipCode", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLatLong)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Shop.prototype, "geoloc", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPhoneNumber)("FR"),
    (0, class_validator_1.Length)(10, 10),
    (0, typeorm_1.Column)({
        length: 10,
    }),
    __metadata("design:type", String)
], Shop.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Shop.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)({
        default: true,
    }),
    __metadata("design:type", Boolean)
], Shop.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Card, (card) => card.shop),
    __metadata("design:type", Array)
], Shop.prototype, "cards", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Shop.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Shop.prototype, "updatedAt", void 0);
Shop = __decorate([
    (0, typeorm_1.Entity)({ name: "shops" }) // table name in database
], Shop);
exports.Shop = Shop;
//# sourceMappingURL=shop.js.map