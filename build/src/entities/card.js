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
exports.Card = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Card = class Card {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Card.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUrl)(),
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], Card.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    (0, typeorm_1.Column)({
        type: "timestamp",
        precision: 3,
    }),
    __metadata("design:type", Date)
], Card.prototype, "startAt", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    (0, typeorm_1.Column)({
        type: "timestamp",
        precision: 3,
    }),
    __metadata("design:type", Date)
], Card.prototype, "endAt", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)({
        default: true,
    }),
    __metadata("design:type", Boolean)
], Card.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Card.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Shop, (shop) => shop.cards),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", _1.Shop)
], Card.prototype, "shop", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Card.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, (user) => user.cards),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", _1.User)
], Card.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Card.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Card.prototype, "updatedAt", void 0);
Card = __decorate([
    (0, typeorm_1.Entity)({ name: "cards" }) // table name in database
], Card);
exports.Card = Card;
//# sourceMappingURL=card.js.map