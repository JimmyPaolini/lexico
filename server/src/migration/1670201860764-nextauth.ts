import {MigrationInterface, QueryRunner} from "typeorm";

export class nextauth1670201860764 implements MigrationInterface {
    name = 'nextauth1670201860764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "custom_text" DROP CONSTRAINT "FK_356ee84df487f95917ee0e8c91e"`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "FK_42f233d32109ddba4b884cd603c"`);
        await queryRunner.query(`ALTER TABLE "word_entries_entry" DROP CONSTRAINT "FK_229416c66a59e09d7aff7895ac6"`);
        await queryRunner.query(`ALTER TABLE "word_entries_entry" DROP CONSTRAINT "FK_da3a239606cdf6099974d353433"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_470355432cc67b2c470c30bef7c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "googleId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_7989eba4dafdd5322761765f2b8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordResetToken"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "provider" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "providerId" character varying`);
        await queryRunner.query(`ALTER TABLE "custom_text" ADD CONSTRAINT "FK_356ee84df487f95917ee0e8c91e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "FK_42f233d32109ddba4b884cd603c" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "word_entries_entry" ADD CONSTRAINT "FK_da3a239606cdf6099974d353433" FOREIGN KEY ("wordWord") REFERENCES "word"("word") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "word_entries_entry" ADD CONSTRAINT "FK_229416c66a59e09d7aff7895ac6" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "word_entries_entry" DROP CONSTRAINT "FK_229416c66a59e09d7aff7895ac6"`);
        await queryRunner.query(`ALTER TABLE "word_entries_entry" DROP CONSTRAINT "FK_da3a239606cdf6099974d353433"`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "FK_42f233d32109ddba4b884cd603c"`);
        await queryRunner.query(`ALTER TABLE "custom_text" DROP CONSTRAINT "FK_356ee84df487f95917ee0e8c91e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "providerId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordResetToken" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_7989eba4dafdd5322761765f2b8" UNIQUE ("facebookId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "googleId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_470355432cc67b2c470c30bef7c" UNIQUE ("googleId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "word_entries_entry" ADD CONSTRAINT "FK_da3a239606cdf6099974d353433" FOREIGN KEY ("wordWord") REFERENCES "word"("word") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "word_entries_entry" ADD CONSTRAINT "FK_229416c66a59e09d7aff7895ac6" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "FK_42f233d32109ddba4b884cd603c" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "custom_text" ADD CONSTRAINT "FK_356ee84df487f95917ee0e8c91e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
