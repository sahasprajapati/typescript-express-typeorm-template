import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntityBase1651408915570 implements MigrationInterface {
    name = 'UpdateEntityBase1651408915570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food" DROP CONSTRAINT "FK_75c14b26f5e3bbf64ff69a407fb"`);
        await queryRunner.query(`ALTER TABLE "food" DROP CONSTRAINT "FK_55f8372edc750a946acfae03ea5"`);
        await queryRunner.query(`ALTER TABLE "food" DROP CONSTRAINT "REL_75c14b26f5e3bbf64ff69a407f"`);
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "create_user_id"`);
        await queryRunner.query(`ALTER TABLE "food" DROP CONSTRAINT "REL_55f8372edc750a946acfae03ea"`);
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "update_user_id"`);
        await queryRunner.query(`ALTER TABLE "food" ADD "created_by_user_id" integer`);
        await queryRunner.query(`ALTER TABLE "food" ADD CONSTRAINT "UQ_a7fc6dfffe491bb51b57d221ee6" UNIQUE ("created_by_user_id")`);
        await queryRunner.query(`ALTER TABLE "food" ADD "updated_by_user_id" integer`);
        await queryRunner.query(`ALTER TABLE "food" ADD CONSTRAINT "UQ_bb986e93f962c8e1282674ec9ef" UNIQUE ("updated_by_user_id")`);
        await queryRunner.query(`ALTER TABLE "food" ADD CONSTRAINT "FK_a7fc6dfffe491bb51b57d221ee6" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "food" ADD CONSTRAINT "FK_bb986e93f962c8e1282674ec9ef" FOREIGN KEY ("updated_by_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food" DROP CONSTRAINT "FK_bb986e93f962c8e1282674ec9ef"`);
        await queryRunner.query(`ALTER TABLE "food" DROP CONSTRAINT "FK_a7fc6dfffe491bb51b57d221ee6"`);
        await queryRunner.query(`ALTER TABLE "food" DROP CONSTRAINT "UQ_bb986e93f962c8e1282674ec9ef"`);
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "updated_by_user_id"`);
        await queryRunner.query(`ALTER TABLE "food" DROP CONSTRAINT "UQ_a7fc6dfffe491bb51b57d221ee6"`);
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "created_by_user_id"`);
        await queryRunner.query(`ALTER TABLE "food" ADD "update_user_id" integer`);
        await queryRunner.query(`ALTER TABLE "food" ADD CONSTRAINT "REL_55f8372edc750a946acfae03ea" UNIQUE ("update_user_id")`);
        await queryRunner.query(`ALTER TABLE "food" ADD "create_user_id" integer`);
        await queryRunner.query(`ALTER TABLE "food" ADD CONSTRAINT "REL_75c14b26f5e3bbf64ff69a407f" UNIQUE ("create_user_id")`);
        await queryRunner.query(`ALTER TABLE "food" ADD CONSTRAINT "FK_55f8372edc750a946acfae03ea5" FOREIGN KEY ("update_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "food" ADD CONSTRAINT "FK_75c14b26f5e3bbf64ff69a407fb" FOREIGN KEY ("create_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
