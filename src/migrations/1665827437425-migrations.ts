import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1665827437425 implements MigrationInterface {
  name = "migrations1665827437425";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" ADD "Id" SERIAL NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" DROP CONSTRAINT "PK_dd6333372adc540b278a65b6f91"`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" ADD CONSTRAINT "PK_49136421040620018165c174ae3" PRIMARY KEY ("shopId", "userId", "promotionId", "Id")`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ALTER COLUMN "shopId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" DROP CONSTRAINT "PK_49136421040620018165c174ae3"`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" ADD CONSTRAINT "PK_de5c58da06d37c4a889d22bb423" PRIMARY KEY ("userId", "promotionId", "Id")`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" DROP CONSTRAINT "PK_de5c58da06d37c4a889d22bb423"`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" ADD CONSTRAINT "PK_ce0ed5a45284107e7a9f0882961" PRIMARY KEY ("promotionId", "Id")`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" DROP CONSTRAINT "PK_ce0ed5a45284107e7a9f0882961"`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" ADD CONSTRAINT "PK_1ab03ad1109752b1b7aeb52dcef" PRIMARY KEY ("Id")`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" ADD CONSTRAINT "UQ_d90403344ac897d85343a843880" UNIQUE ("promotionId")`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" ADD CONSTRAINT "FK_d90403344ac897d85343a843880" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" DROP CONSTRAINT "FK_d90403344ac897d85343a843880"`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" DROP CONSTRAINT "UQ_d90403344ac897d85343a843880"`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" DROP CONSTRAINT "PK_1ab03ad1109752b1b7aeb52dcef"`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" ADD CONSTRAINT "PK_ce0ed5a45284107e7a9f0882961" PRIMARY KEY ("promotionId", "Id")`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" DROP CONSTRAINT "PK_ce0ed5a45284107e7a9f0882961"`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" ADD CONSTRAINT "PK_de5c58da06d37c4a889d22bb423" PRIMARY KEY ("userId", "promotionId", "Id")`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" DROP CONSTRAINT "PK_de5c58da06d37c4a889d22bb423"`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" ADD CONSTRAINT "PK_49136421040620018165c174ae3" PRIMARY KEY ("shopId", "userId", "promotionId", "Id")`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ALTER COLUMN "shopId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" DROP CONSTRAINT "PK_49136421040620018165c174ae3"`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" ADD CONSTRAINT "PK_dd6333372adc540b278a65b6f91" PRIMARY KEY ("shopId", "userId", "promotionId")`
    );
    await queryRunner.query(
      `ALTER TABLE "promotions-counter" DROP COLUMN "Id"`
    );
  }
}
