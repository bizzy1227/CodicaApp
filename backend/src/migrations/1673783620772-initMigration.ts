import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigration1673783620772 implements MigrationInterface {
    name = 'initMigration1673783620772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_enum" AS ENUM('profitable', 'consumable')`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric(16,2) NOT NULL, "type" "public"."transaction_type_enum" NOT NULL, "bankId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "balance" numeric(16,2) NOT NULL, CONSTRAINT "UQ_11f196da2e68cef1c7e84b4fe94" UNIQUE ("name"), CONSTRAINT "PK_7651eaf705126155142947926e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions_categories" ("transactionId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_96d6b57fddd64eeecf83163886d" PRIMARY KEY ("transactionId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9663195b0f25b9ce5ab45094f1" ON "transactions_categories" ("transactionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b88ad1dd18b2d752290d24097c" ON "transactions_categories" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_d8686d6790ecde6318e48232d06" FOREIGN KEY ("bankId") REFERENCES "bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions_categories" ADD CONSTRAINT "FK_9663195b0f25b9ce5ab45094f13" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "transactions_categories" ADD CONSTRAINT "FK_b88ad1dd18b2d752290d24097ca" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions_categories" DROP CONSTRAINT "FK_b88ad1dd18b2d752290d24097ca"`);
        await queryRunner.query(`ALTER TABLE "transactions_categories" DROP CONSTRAINT "FK_9663195b0f25b9ce5ab45094f13"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_d8686d6790ecde6318e48232d06"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b88ad1dd18b2d752290d24097c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9663195b0f25b9ce5ab45094f1"`);
        await queryRunner.query(`DROP TABLE "transactions_categories"`);
        await queryRunner.query(`DROP TABLE "bank"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
