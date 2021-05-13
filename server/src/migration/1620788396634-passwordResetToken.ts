import {MigrationInterface, QueryRunner} from "typeorm";

export class passwordResetToken1620788396634 implements MigrationInterface {
    name = 'passwordResetToken1620788396634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordResetToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordResetToken"`);
    }

}
