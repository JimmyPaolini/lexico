import { MigrationInterface, QueryRunner } from "typeorm"

export class migration1620659485423 implements MigrationInterface {
  name = "migration1620659485423"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "translation" DROP CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70"
        `)
    await queryRunner.query(`
            ALTER TABLE "translation" DROP COLUMN "id"
        `)
    await queryRunner.query(`
            ALTER TABLE "translation"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `)
    await queryRunner.query(`
            ALTER TABLE "translation"
            ADD CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70" PRIMARY KEY ("id")
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "translation" DROP CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70"
        `)
    await queryRunner.query(`
            ALTER TABLE "translation" DROP COLUMN "id"
        `)
    await queryRunner.query(`
            ALTER TABLE "translation"
            ADD "id" SERIAL NOT NULL
        `)
    await queryRunner.query(`
            ALTER TABLE "translation"
            ADD CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70" PRIMARY KEY ("id")
        `)
  }
}
