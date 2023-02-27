import { MigrationInterface, QueryRunner } from "typeorm";

export class AddShopCity1677499246360 implements MigrationInterface {
    name = 'AddShopCity1677499246360'

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shops" ADD "city" character varying`
    );
    await queryRunner.query(
      `UPDATE "shops" SET city='Paris'`
    );
    await queryRunner.query(
      `ALTER TABLE "shops" ALTER COLUMN "city" SET NOT NULL`
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shops" DROP COLUMN "city"`);
    }

}
