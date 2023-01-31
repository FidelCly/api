import { MigrationInterface, QueryRunner } from "typeorm";

export class SplitGeoloc1675165256308 implements MigrationInterface {
    name = 'SplitGeoloc1675165256308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shops" DROP COLUMN "geoloc"`);
        await queryRunner.query(`ALTER TABLE "shops" ADD "lat" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shops" ADD "long" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shops" DROP COLUMN "long"`);
        await queryRunner.query(`ALTER TABLE "shops" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "shops" ADD "geoloc" character varying NOT NULL`);
    }

}
