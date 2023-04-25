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
exports.PromotionCounter = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let PromotionCounter = class PromotionCounter {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], PromotionCounter.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], PromotionCounter.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], PromotionCounter.prototype, "promotionId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PromotionCounter.prototype, "increment", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], PromotionCounter.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PromotionCounter.prototype, "nbValidation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PromotionCounter.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PromotionCounter.prototype, "updatedAt", void 0);
PromotionCounter = __decorate([
    (0, typeorm_1.Entity)({ name: "promotions-counter" }) // table name in database
], PromotionCounter);
exports.PromotionCounter = PromotionCounter;
//# sourceMappingURL=promotion-counter.js.map