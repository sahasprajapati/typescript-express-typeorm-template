import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1651399610792 implements MigrationInterface {
  name = 'Init1651399610792';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "food" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "startTime" character varying NOT NULL, "endTime" character varying NOT NULL, "quantity" integer NOT NULL, "create_user_id" integer, "update_user_id" integer, CONSTRAINT "REL_75c14b26f5e3bbf64ff69a407f" UNIQUE ("create_user_id"), CONSTRAINT "REL_55f8372edc750a946acfae03ea" UNIQUE ("update_user_id"), CONSTRAINT "PK_26d12de4b6576ff08d30c281837" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "food" ADD CONSTRAINT "FK_75c14b26f5e3bbf64ff69a407fb" FOREIGN KEY ("create_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "food" ADD CONSTRAINT "FK_55f8372edc750a946acfae03ea5" FOREIGN KEY ("update_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "food" DROP CONSTRAINT "FK_55f8372edc750a946acfae03ea5"`
    );
    await queryRunner.query(
      `ALTER TABLE "food" DROP CONSTRAINT "FK_75c14b26f5e3bbf64ff69a407fb"`
    );
    await queryRunner.query(`DROP TABLE "food"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
