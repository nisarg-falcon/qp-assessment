import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedAtProductTable1732603828240
  implements MigrationInterface
{
  name = 'AddDeletedAtProductTable1732603828240';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "deleted_at" TIMESTAMP`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "deleted_at"`);
  }
}
