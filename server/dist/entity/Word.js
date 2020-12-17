"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Word_1;
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Forms_1 = __importDefault(require("./forms/Forms"));
const PrincipalPart_1 = __importDefault(require("./PrincipalPart"));
const Pronunciation_1 = require("./Pronunciation");
const Record_1 = __importDefault(require("./Record"));
const Translation_1 = __importDefault(require("./Translation"));
let Word = Word_1 = class Word extends Record_1.default {
};
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Word.prototype, "word", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Word_1, (word) => word.roots, {
        cascade: ["insert", "update", "recover", "soft-remove"],
    }),
    typeorm_1.JoinTable(),
    type_graphql_1.Field(() => Word_1),
    __metadata("design:type", Array)
], Word.prototype, "roots", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 16, nullable: true }),
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], Word.prototype, "partOfSpeech", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 1028, nullable: true }),
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], Word.prototype, "inflection", void 0);
__decorate([
    typeorm_1.Column("json", { nullable: true }),
    type_graphql_1.Field(() => [PrincipalPart_1.default]),
    __metadata("design:type", Array)
], Word.prototype, "principalParts", void 0);
__decorate([
    typeorm_1.OneToMany(() => Translation_1.default, (translation) => translation.word, {
        nullable: true,
        eager: true,
        cascade: true,
    }),
    type_graphql_1.Field(() => [Translation_1.default]),
    __metadata("design:type", Array)
], Word.prototype, "translations", void 0);
__decorate([
    typeorm_1.Column("json", { nullable: true }),
    type_graphql_1.Field(() => Forms_1.default, { nullable: true }),
    __metadata("design:type", Object)
], Word.prototype, "forms", void 0);
__decorate([
    typeorm_1.Column("json", { nullable: true }),
    type_graphql_1.Field(() => Pronunciation_1.Pronunciation),
    __metadata("design:type", Pronunciation_1.Pronunciation)
], Word.prototype, "pronunciation", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 1028, nullable: true }),
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], Word.prototype, "etymology", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Word_1, (word) => word.synonyms),
    typeorm_1.JoinTable(),
    type_graphql_1.Field(() => [Word_1]),
    __metadata("design:type", Array)
], Word.prototype, "synonyms", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Word_1, (word) => word.antonyms),
    typeorm_1.JoinTable(),
    type_graphql_1.Field(() => [Word_1]),
    __metadata("design:type", Array)
], Word.prototype, "antonyms", void 0);
Word = Word_1 = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType({ implements: Record_1.default })
], Word);
exports.default = Word;
//# sourceMappingURL=Word.js.map