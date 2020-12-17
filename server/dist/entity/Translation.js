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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Record_1 = __importDefault(require("./Record"));
const Word_1 = __importDefault(require("./Word"));
let Translation = class Translation extends Record_1.default {
    constructor(text, word) {
        super();
        this.text = text;
        this.word = word;
    }
};
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], Translation.prototype, "text", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Word_1.default, (word) => word.translations),
    typeorm_1.JoinColumn(),
    type_graphql_1.Field(() => Word_1.default),
    __metadata("design:type", Word_1.default)
], Translation.prototype, "word", void 0);
Translation = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType({ implements: Record_1.default }),
    __metadata("design:paramtypes", [String, Word_1.default])
], Translation);
exports.default = Translation;
//# sourceMappingURL=Translation.js.map