import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBalanceTable1674577131188 implements MigrationInterface {
    name = 'AddBalanceTable1674577131188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "balances" ("id" SERIAL NOT NULL, "counter" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "promotionId" integer, "cardId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_74904758e813e401abc3d4261c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "balances" ADD CONSTRAINT "FK_311bc0abdc0ad29dd433287d358" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "balances" ADD CONSTRAINT "FK_5bc0373f8a6390e1c325faacde5" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balances" DROP CONSTRAINT "FK_5bc0373f8a6390e1c325faacde5"`);
        await queryRunner.query(`ALTER TABLE "balances" DROP CONSTRAINT "FK_311bc0abdc0ad29dd433287d358"`);
        await queryRunner.query(`DROP TABLE "balances"`);
    }

}
