import { MigrationInterface, QueryRunner } from "typeorm";
import { ShopActivity } from "../entities";

export class AddShopActivity1675344154445 implements MigrationInterface {
  name = "AddShopActivity1675344154445";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shops" ADD "activity" character varying`
    );
    await queryRunner.query(
      `UPDATE "shops" SET activity='${ShopActivity.Store}'`
    );
    await queryRunner.query(
      `ALTER TABLE "shops" ALTER COLUMN "activity" SET NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shops" DROP COLUMN "activity"`);
  }
}
