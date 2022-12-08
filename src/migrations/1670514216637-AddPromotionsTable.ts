import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPromotionsTable1670514216637 implements MigrationInterface {
    name = 'AddPromotionsTable1670514216637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "promotions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "checkoutLimit" integer NOT NULL, "startAt" TIMESTAMP(3) NOT NULL, "endAt" TIMESTAMP(3) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "shopId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_380cecbbe3ac11f0e5a7c452c34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "promotion-counters" ("id" SERIAL NOT NULL, "counter" integer NOT NULL DEFAULT '0', "cardId" integer NOT NULL, "promotionId" integer NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_50c64db9d3b965cd4fc7c6e15b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "promotions" ADD CONSTRAINT "FK_00441b80473cfc564fd07268393" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "promotion-counters" ADD CONSTRAINT "FK_19219b7d7f71ed36244a75100be" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "promotion-counters" ADD CONSTRAINT "FK_03473be51773ac95bcb8acfafe2" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promotion-counters" DROP CONSTRAINT "FK_03473be51773ac95bcb8acfafe2"`);
        await queryRunner.query(`ALTER TABLE "promotion-counters" DROP CONSTRAINT "FK_19219b7d7f71ed36244a75100be"`);
        await queryRunner.query(`ALTER TABLE "promotions" DROP CONSTRAINT "FK_00441b80473cfc564fd07268393"`);
        await queryRunner.query(`DROP TABLE "promotion-counters"`);
        await queryRunner.query(`DROP TABLE "promotions"`);
    }

}
