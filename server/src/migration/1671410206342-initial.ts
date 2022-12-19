import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1671410206342 implements MigrationInterface {
    name = 'initial1671410206342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "custom_text" ("id" uuid NOT NULL, "title" character varying(100) NOT NULL, "text" character varying(100000) NOT NULL, "userId" uuid, CONSTRAINT "PK_d6817b722963bd530f4594f6c7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying, "googleId" character varying, "facebookId" character varying, "settings" json NOT NULL DEFAULT '{"theme":"dark","fontSize":24,"formsExpandedDefault":false,"translationsExpandedDefault":false,"dictionaryMacronized":true,"literatureMacronized":false}', "passwordResetToken" character varying, CONSTRAINT "UQ_470355432cc67b2c470c30bef7c" UNIQUE ("googleId"), CONSTRAINT "UQ_7989eba4dafdd5322761765f2b8" UNIQUE ("facebookId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "translation" character varying(2047) NOT NULL, "entryId" character varying(127), CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "word" ("word" character varying NOT NULL, CONSTRAINT "PK_8355d962fea7fe9fef57d58ffff" PRIMARY KEY ("word"))`);
        await queryRunner.query(`CREATE TABLE "entry" ("id" character varying(127) NOT NULL, "partOfSpeech" character varying(32) NOT NULL, "principalParts" json, "inflection" json, "forms" json, "pronunciation" json, "etymology" character varying(1027), CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "line" ("id" character varying NOT NULL, "line" character varying NOT NULL, "lineNumber" integer NOT NULL, "lineLabel" character varying(16) NOT NULL, "textId" character varying, CONSTRAINT "PK_3d944a608f62f599dfe688ff2b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "text" ("id" character varying NOT NULL, "title" character varying(64) NOT NULL, "authorId" character varying, "bookId" character varying, CONSTRAINT "PK_ef734161ea7c326fedf699309f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" character varying NOT NULL, "title" character varying(64) NOT NULL, "authorId" character varying, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" character varying NOT NULL, "name" character varying(64) NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_bookmarks_entry" ("userId" uuid NOT NULL, "entryId" character varying(127) NOT NULL, CONSTRAINT "PK_4374ed65e0cd09a31267341c1b0" PRIMARY KEY ("userId", "entryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_27e6453195447c82a011c91d57" ON "user_bookmarks_entry" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_42f233d32109ddba4b884cd603" ON "user_bookmarks_entry" ("entryId") `);
        await queryRunner.query(`CREATE TABLE "word_entries_entry" ("wordWord" character varying NOT NULL, "entryId" character varying(127) NOT NULL, CONSTRAINT "PK_a3f448825f627a6594e3771edca" PRIMARY KEY ("wordWord", "entryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_da3a239606cdf6099974d35343" ON "word_entries_entry" ("wordWord") `);
        await queryRunner.query(`CREATE INDEX "IDX_229416c66a59e09d7aff7895ac" ON "word_entries_entry" ("entryId") `);
        await queryRunner.query(`ALTER TABLE "custom_text" ADD CONSTRAINT "FK_356ee84df487f95917ee0e8c91e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "translation" ADD CONSTRAINT "FK_1c42b4acff3b1813d3b69c4db60" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "line" ADD CONSTRAINT "FK_6afaa69fd45863a3d36008b67c3" FOREIGN KEY ("textId") REFERENCES "text"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "text" ADD CONSTRAINT "FK_345853091063e17288c918bb916" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "text" ADD CONSTRAINT "FK_7a5a0a5986606bec126cbc65ae0" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "FK_27e6453195447c82a011c91d570" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks_entry" ADD CONSTRAINT "FK_42f233d32109ddba4b884cd603c" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "word_entries_entry" ADD CONSTRAINT "FK_da3a239606cdf6099974d353433" FOREIGN KEY ("wordWord") REFERENCES "word"("word") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "word_entries_entry" ADD CONSTRAINT "FK_229416c66a59e09d7aff7895ac6" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "word_entries_entry" DROP CONSTRAINT "FK_229416c66a59e09d7aff7895ac6"`);
        await queryRunner.query(`ALTER TABLE "word_entries_entry" DROP CONSTRAINT "FK_da3a239606cdf6099974d353433"`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "FK_42f233d32109ddba4b884cd603c"`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks_entry" DROP CONSTRAINT "FK_27e6453195447c82a011c91d570"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"`);
        await queryRunner.query(`ALTER TABLE "text" DROP CONSTRAINT "FK_7a5a0a5986606bec126cbc65ae0"`);
        await queryRunner.query(`ALTER TABLE "text" DROP CONSTRAINT "FK_345853091063e17288c918bb916"`);
        await queryRunner.query(`ALTER TABLE "line" DROP CONSTRAINT "FK_6afaa69fd45863a3d36008b67c3"`);
        await queryRunner.query(`ALTER TABLE "translation" DROP CONSTRAINT "FK_1c42b4acff3b1813d3b69c4db60"`);
        await queryRunner.query(`ALTER TABLE "custom_text" DROP CONSTRAINT "FK_356ee84df487f95917ee0e8c91e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_229416c66a59e09d7aff7895ac"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da3a239606cdf6099974d35343"`);
        await queryRunner.query(`DROP TABLE "word_entries_entry"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_42f233d32109ddba4b884cd603"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_27e6453195447c82a011c91d57"`);
        await queryRunner.query(`DROP TABLE "user_bookmarks_entry"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "text"`);
        await queryRunner.query(`DROP TABLE "line"`);
        await queryRunner.query(`DROP TABLE "entry"`);
        await queryRunner.query(`DROP TABLE "word"`);
        await queryRunner.query(`DROP TABLE "translation"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "custom_text"`);
    }

}
