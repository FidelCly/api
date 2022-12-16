import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPromotionTable1671221397845 implements MigrationInterface {
  name = "AddPromotionTable1671221397845";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "promotions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "checkoutLimit" integer NOT NULL, "startAt" TIMESTAMP(3) NOT NULL, "endAt" TIMESTAMP(3) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "shopId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_380cecbbe3ac11f0e5a7c452c34" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ADD CONSTRAINT "FK_00441b80473cfc564fd07268393" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "promotions" DROP CONSTRAINT "FK_00441b80473cfc564fd07268393"`
    );
    await queryRunner.query(`DROP TABLE "promotions"`);
  }
}
