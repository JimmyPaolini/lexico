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
const Imperative_1 = __importDefault(require("./Imperative"));
const Indicative_1 = __importDefault(require("./Indicative"));
const NonFinite_1 = __importDefault(require("./NonFinite"));
const Subjunctive_1 = __importDefault(require("./Subjunctive"));
const VerbalNoun_1 = __importDefault(require("./VerbalNoun"));
let VerbForms = class VerbForms {
};
__decorate([
    type_graphql_1.Field(() => Indicative_1.default),
    __metadata("design:type", Indicative_1.default)
], VerbForms.prototype, "indicative", void 0);
__decorate([
    type_graphql_1.Field(() => Subjunctive_1.default),
    __metadata("design:type", Subjunctive_1.default)
], VerbForms.prototype, "subjunctive", void 0);
__decorate([
    type_graphql_1.Field(() => Imperative_1.default),
    __metadata("design:type", Imperative_1.default)
], VerbForms.prototype, "imperative", void 0);
__decorate([
    type_graphql_1.Field(() => NonFinite_1.default),
    __metadata("design:type", NonFinite_1.default)
], VerbForms.prototype, "nonFinite", void 0);
__decorate([
    type_graphql_1.Field(() => VerbalNoun_1.default),
    __metadata("design:type", VerbalNoun_1.default)
], VerbForms.prototype, "verbalNoun", void 0);
VerbForms = __decorate([
    type_graphql_1.ObjectType()
], VerbForms);
exports.default = VerbForms;
//# sourceMappingURL=VerbForms.js.map