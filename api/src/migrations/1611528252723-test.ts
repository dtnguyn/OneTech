import { MigrationInterface, QueryRunner } from "typeorm";

export class test1611528252723 implements MigrationInterface {
  name = "test1611528252723";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "device" DROP CONSTRAINT "UQ_c3e9688a8396aa73ce23dd6013e"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "device" ADD CONSTRAINT "UQ_c3e9688a8396aa73ce23dd6013e" UNIQUE ("price")`
    );
  }
}
