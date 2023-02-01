import { MigrationInterface, QueryRunner } from "typeorm";

export class SplitGeoloc1675165256308 implements MigrationInterface {
  name = "SplitGeoloc1675165256308";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shops" ADD "lat" character varying`);
    await queryRunner.query(
      `UPDATE "shops" SET lat=SPLIT_PART(geoloc, ',', 1)`
    );
    await queryRunner.query(
      `ALTER TABLE "shops" ALTER COLUMN "lat" SET NOT NULL`
    );

    await queryRunner.query(`ALTER TABLE "shops" ADD "long" character varying`);
    await queryRunner.query(
      `UPDATE "shops" SET long=SPLIT_PART(geoloc, ',', 2)`
    );
    await queryRunner.query(
      `ALTER TABLE "shops" ALTER COLUMN "long" SET NOT NULL`
    );

    await queryRunner.query(`ALTER TABLE "shops" DROP COLUMN "geoloc"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shops" ADD "geoloc" character varying`
    );
    await queryRunner.query(`UPDATE "shops" SET geoloc=CONCAT(lat, ',', long)`);
    await queryRunner.query(
      `ALTER TABLE "shops" ALTER COLUMN "geoloc" SET NOT NULL`
    );

    await queryRunner.query(`ALTER TABLE "shops" DROP COLUMN "long"`);
    await queryRunner.query(`ALTER TABLE "shops" DROP COLUMN "lat"`);
  }
}
