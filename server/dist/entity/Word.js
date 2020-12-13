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
const typeorm_1 = require("typeorm");
const Record_1 = __importDefault(require("./Record"));
const Translation_1 = __importDefault(require("./Translation"));
let Word = Word_1 = class Word extends Record_1.default {
};
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Word.prototype, "word", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Word_1, word => word.roots),
    typeorm_1.JoinTable(),
    __metadata("design:type", Object)
], Word.prototype, "roots", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Word.prototype, "partOfSpeech", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Word.prototype, "inflection", void 0);
__decorate([
    typeorm_1.Column("json", { nullable: true }),
    __metadata("design:type", Array)
], Word.prototype, "principalParts", void 0);
__decorate([
    typeorm_1.OneToMany(() => Translation_1.default, translation => translation.word, {
        nullable: true,
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], Word.prototype, "translations", void 0);
__decorate([
    typeorm_1.Column("json", { nullable: true }),
    __metadata("design:type", Object)
], Word.prototype, "forms", void 0);
__decorate([
    typeorm_1.Column("json", { nullable: true }),
    __metadata("design:type", Object)
], Word.prototype, "pronunciation", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Word.prototype, "etymology", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Word_1, word => word.synonyms),
    typeorm_1.JoinTable(),
    __metadata("design:type", Object)
], Word.prototype, "synonyms", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Word_1, word => word.antonyms),
    typeorm_1.JoinTable(),
    __metadata("design:type", Object)
], Word.prototype, "antonyms", void 0);
Word = Word_1 = __decorate([
    typeorm_1.Entity()
], Word);
exports.default = Word;
//# sourceMappingURL=Word.js.map