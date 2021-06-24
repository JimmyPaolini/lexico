import { MigrationInterface, QueryRunner } from "typeorm"

export class passwordResetTokenAndUuids1624551360693
  implements MigrationInterface
{
  name = "passwordResetTokenAndUuids1624551360693"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "translation" DROP CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70"`,
    )
    await queryRunner.query(`ALTER TABLE "translation" DROP COLUMN "id"`)
    await queryRunner.query(
      `ALTER TABLE "translation" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    )
    await queryRunner.query(
      `ALTER TABLE "translation" ADD CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70" PRIMARY KEY ("id")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "passwordResetToken" character varying`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "FK_27e6453195447c82a011c91d570"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP CONSTRAINT "FK_f74849fbd710f0f7528d6e549c5"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    )
    await queryRunner.query(`DELETE FROM "user_bookmarks_entry"`)
    await queryRunner.query(`DROP INDEX "IDX_27e6453195447c82a011c91d57"`)
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP COLUMN "userId"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD "userId" uuid NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "PK_4374ed65e0cd09a31267341c1b0" PRIMARY KEY ("entryId", "userId")`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_27e6453195447c82a011c91d57" ON "user_bookmarks_entry" ("userId") `,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "FK_27e6453195447c82a011c91d570" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(`DELETE FROM "user_readings_line"`)
    await queryRunner.query(`DROP INDEX "IDX_f74849fbd710f0f7528d6e549c"`)
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP COLUMN "userId"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD "userId" uuid NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD CONSTRAINT "PK_7e5d2f6ab6d9d793221c88afb08" PRIMARY KEY ("lineId", "userId")`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_f74849fbd710f0f7528d6e549c" ON "user_readings_line" ("userId") `,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD CONSTRAINT "FK_f74849fbd710f0f7528d6e549c5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    const userIdQuery = `SELECT "id" FROM "user" WHERE email = 'venienn@gmail.com'`
    await queryRunner.query(
      `INSERT INTO "user_bookmarks_entry" ("userId", "entryId") VALUES ((${userIdQuery}), 'latino:0'), ((${userIdQuery}), 'qui:1')`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "word_entries_entry" DROP CONSTRAINT "FK_229416c66a59e09d7aff7895ac6"`,
    )
    await queryRunner.query(
      `ALTER TABLE "word_entries_entry" DROP CONSTRAINT "FK_da3a239606cdf6099974d353433"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP CONSTRAINT "FK_7cec9ae62a9f8c83075e875159f"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP CONSTRAINT "FK_f74849fbd710f0f7528d6e549c5"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "FK_42f233d32109ddba4b884cd603c"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "FK_27e6453195447c82a011c91d570"`,
    )
    await queryRunner.query(
      `ALTER TABLE "translation" DROP CONSTRAINT "FK_1c42b4acff3b1813d3b69c4db60"`,
    )
    await queryRunner.query(
      `ALTER TABLE "line" DROP CONSTRAINT "FK_6afaa69fd45863a3d36008b67c3"`,
    )
    await queryRunner.query(
      `ALTER TABLE "text" DROP CONSTRAINT "FK_7a5a0a5986606bec126cbc65ae0"`,
    )
    await queryRunner.query(
      `ALTER TABLE "text" DROP CONSTRAINT "FK_345853091063e17288c918bb916"`,
    )
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"`,
    )
    await queryRunner.query(`DROP INDEX "IDX_f74849fbd710f0f7528d6e549c"`)
    await queryRunner.query(`DROP INDEX "IDX_27e6453195447c82a011c91d57"`)
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP CONSTRAINT "PK_7e5d2f6ab6d9d793221c88afb08"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD CONSTRAINT "PK_7cec9ae62a9f8c83075e875159f" PRIMARY KEY ("lineId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP COLUMN "userId"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD "userId" integer NOT NULL`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_f74849fbd710f0f7528d6e549c" ON "user_readings_line" ("userId") `,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" DROP CONSTRAINT "PK_7cec9ae62a9f8c83075e875159f"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD CONSTRAINT "PK_7e5d2f6ab6d9d793221c88afb08" PRIMARY KEY ("userId", "lineId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "PK_4374ed65e0cd09a31267341c1b0"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "PK_42f233d32109ddba4b884cd603c" PRIMARY KEY ("entryId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP COLUMN "userId"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD "userId" integer NOT NULL`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_27e6453195447c82a011c91d57" ON "user_bookmarks_entry" ("userId") `,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "PK_42f233d32109ddba4b884cd603c"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "PK_4374ed65e0cd09a31267341c1b0" PRIMARY KEY ("userId", "entryId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "entry" DROP CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6"`,
    )
    await queryRunner.query(
      `ALTER TABLE "word" DROP CONSTRAINT "PK_8355d962fea7fe9fef57d58ffff"`,
    )
    await queryRunner.query(
      `ALTER TABLE "translation" DROP CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70"`,
    )
    await queryRunner.query(`ALTER TABLE "translation" DROP COLUMN "id"`)
    await queryRunner.query(
      `ALTER TABLE "translation" ADD "id" SERIAL NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "translation" ADD CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70" PRIMARY KEY ("id")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`)
    await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    )
    await queryRunner.query(
      `ALTER TABLE "line" DROP CONSTRAINT "PK_3d944a608f62f599dfe688ff2b1"`,
    )
    await queryRunner.query(
      `ALTER TABLE "text" DROP CONSTRAINT "PK_ef734161ea7c326fedf699309f9"`,
    )
    await queryRunner.query(
      `ALTER TABLE "author" DROP CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871"`,
    )
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "passwordResetToken"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_readings_line" ADD CONSTRAINT "FK_f74849fbd710f0f7528d6e549c5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "FK_27e6453195447c82a011c91d570" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }
}
