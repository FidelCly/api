"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test1662740365310 = void 0;
class test1662740365310 {
    constructor() {
        this.name = 'test1662740365310';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "promotions" ("id" SERIAL NOT NULL, "shopId" integer NOT NULL, "userId" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "type" integer NOT NULL DEFAULT '0', "limitPassage" integer NOT NULL DEFAULT '10', "limitAmout" integer NOT NULL DEFAULT '10', "isActive" boolean NOT NULL DEFAULT true, "startAt" TIMESTAMP NOT NULL DEFAULT now(), "endAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_380cecbbe3ac11f0e5a7c452c34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "promotions-counter" ("shopId" integer NOT NULL, "userId" integer NOT NULL, "promotionId" integer NOT NULL, "increment" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "nbValidation" integer NOT NULL DEFAULT '0', "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dd6333372adc540b278a65b6f91" PRIMARY KEY ("shopId", "userId", "promotionId"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "promotions-counter"`);
        await queryRunner.query(`DROP TABLE "promotions"`);
    }
}
exports.test1662740365310 = test1662740365310;
//# sourceMappingURL=1662740365310-test.js.map