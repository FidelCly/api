"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablesInit1659460375342 = void 0;
class TablesInit1659460375342 {
    constructor() {
        this.name = "TablesInit1659460375342";
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "shops" ("id" SERIAL NOT NULL, "companyName" character varying NOT NULL, "siren" character varying(9) NOT NULL, "siret" character varying(14) NOT NULL, "email" character varying NOT NULL, "zipCode" character varying(5) NOT NULL, "geoloc" character varying NOT NULL, "phone" character varying(10) NOT NULL, "address" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3c6aaa6607d287de99815e60b96" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "cards" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "startAt" TIMESTAMP(3) NOT NULL, "endAt" TIMESTAMP(3) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "shopId" integer, "userId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_de0bf9eea214e70588879800f7e" UNIQUE ("url"), CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "cards" ADD CONSTRAINT "FK_aa38da4ab166525deeafe09991c" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "cards" ADD CONSTRAINT "FK_7b7230897ecdeb7d6b0576d907b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "cards" DROP CONSTRAINT "FK_7b7230897ecdeb7d6b0576d907b"');
        await queryRunner.query('ALTER TABLE "cards" DROP CONSTRAINT "FK_aa38da4ab166525deeafe09991c"');
        await queryRunner.query('DROP TABLE "cards"');
        await queryRunner.query('DROP TABLE "shops"');
        await queryRunner.query('DROP TABLE "users"');
    }
}
exports.TablesInit1659460375342 = TablesInit1659460375342;
//# sourceMappingURL=1659460375342-TablesInit.js.map