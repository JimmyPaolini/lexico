import { MigrationInterface, QueryRunner } from "typeorm"

export class customTexts1626550182796 implements MigrationInterface {
  name = "customTexts1626550182796"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_readings_line" `)
    await queryRunner.query(
      `CREATE TABLE "custom_text" ("id" uuid NOT NULL, "title" character varying(100) NOT NULL, "text" character varying(100000) NOT NULL, "userId" uuid, CONSTRAINT "PK_d6817b722963bd530f4594f6c7e" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "custom_text" ADD CONSTRAINT "FK_356ee84df487f95917ee0e8c91e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    // await queryRunner.query(`ALTER TABLE "word" ADD CONSTRAINT "PK_8355d962fea7fe9fef57d58ffff" PRIMARY KEY ("word")`);
    // await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id")`);
    // await queryRunner.query(`ALTER TABLE "line" ADD CONSTRAINT "PK_3d944a608f62f599dfe688ff2b1" PRIMARY KEY ("id")`);
    // await queryRunner.query(`ALTER TABLE "text" ADD CONSTRAINT "PK_ef734161ea7c326fedf699309f9" PRIMARY KEY ("id")`);
    // await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")`);
    // await queryRunner.query(`ALTER TABLE "author" ADD CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id")`);
    // await queryRunner.query(`ALTER TABLE "translation" ADD CONSTRAINT "FK_1c42b4acff3b1813d3b69c4db60" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    // await queryRunner.query(`ALTER TABLE "line" ADD CONSTRAINT "FK_6afaa69fd45863a3d36008b67c3" FOREIGN KEY ("textId") REFERENCES "text"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    // await queryRunner.query(`ALTER TABLE "text" ADD CONSTRAINT "FK_345853091063e17288c918bb916" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    // await queryRunner.query(`ALTER TABLE "text" ADD CONSTRAINT "FK_7a5a0a5986606bec126cbc65ae0" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    // await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    // await queryRunner.query(`ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "FK_42f233d32109ddba4b884cd603c" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    // await queryRunner.query(`ALTER TABLE "word_entries_entry" ADD CONSTRAINT "FK_da3a239606cdf6099974d353433" FOREIGN KEY ("wordWord") REFERENCES "word"("word") ON DELETE CASCADE ON UPDATE CASCADE`);
    // await queryRunner.query(`ALTER TABLE "word_entries_entry" ADD CONSTRAINT "FK_229416c66a59e09d7aff7895ac6" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "custom_text" DROP CONSTRAINT "FK_356ee84df487f95917ee0e8c91e"`,
    )
    await queryRunner.query(`DROP TABLE "custom_text"`)
    // await queryRunner.query(
    //   `ALTER TABLE "word_entries_entry" DROP CONSTRAINT "FK_229416c66a59e09d7aff7895ac6"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "word_entries_entry" DROP CONSTRAINT "FK_da3a239606cdf6099974d353433"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "FK_42f233d32109ddba4b884cd603c"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "text" DROP CONSTRAINT "FK_7a5a0a5986606bec126cbc65ae0"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "text" DROP CONSTRAINT "FK_345853091063e17288c918bb916"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "line" DROP CONSTRAINT "FK_6afaa69fd45863a3d36008b67c3"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "translation" DROP CONSTRAINT "FK_1c42b4acff3b1813d3b69c4db60"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "author" DROP CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "book" DROP CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "text" DROP CONSTRAINT "PK_ef734161ea7c326fedf699309f9"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "line" DROP CONSTRAINT "PK_3d944a608f62f599dfe688ff2b1"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "entry" DROP CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "word" DROP CONSTRAINT "PK_8355d962fea7fe9fef57d58ffff"`,
    // )
  }
}
