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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjunctiveTense = exports.SubjunctiveNumber = exports.SubjunctivePerson = void 0;
const type_graphql_1 = require("type-graphql");
let SubjunctivePerson = class SubjunctivePerson {
};
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], SubjunctivePerson.prototype, "first", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], SubjunctivePerson.prototype, "second", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], SubjunctivePerson.prototype, "third", void 0);
SubjunctivePerson = __decorate([
    type_graphql_1.ObjectType()
], SubjunctivePerson);
exports.SubjunctivePerson = SubjunctivePerson;
let SubjunctiveNumber = class SubjunctiveNumber {
};
__decorate([
    type_graphql_1.Field(() => SubjunctivePerson),
    __metadata("design:type", SubjunctivePerson)
], SubjunctiveNumber.prototype, "singular", void 0);
__decorate([
    type_graphql_1.Field(() => SubjunctivePerson),
    __metadata("design:type", SubjunctivePerson)
], SubjunctiveNumber.prototype, "plural", void 0);
SubjunctiveNumber = __decorate([
    type_graphql_1.ObjectType()
], SubjunctiveNumber);
exports.SubjunctiveNumber = SubjunctiveNumber;
let SubjunctiveTense = class SubjunctiveTense {
};
__decorate([
    type_graphql_1.Field(() => SubjunctiveNumber),
    __metadata("design:type", SubjunctiveNumber)
], SubjunctiveTense.prototype, "present", void 0);
__decorate([
    type_graphql_1.Field(() => SubjunctiveNumber),
    __metadata("design:type", SubjunctiveNumber)
], SubjunctiveTense.prototype, "imperfect", void 0);
__decorate([
    type_graphql_1.Field(() => SubjunctiveNumber),
    __metadata("design:type", SubjunctiveNumber)
], SubjunctiveTense.prototype, "perfect", void 0);
__decorate([
    type_graphql_1.Field(() => SubjunctiveNumber),
    __metadata("design:type", SubjunctiveNumber)
], SubjunctiveTense.prototype, "pluperfect", void 0);
SubjunctiveTense = __decorate([
    type_graphql_1.ObjectType()
], SubjunctiveTense);
exports.SubjunctiveTense = SubjunctiveTense;
let Subjunctive = class Subjunctive {
};
__decorate([
    type_graphql_1.Field(() => SubjunctiveTense),
    __metadata("design:type", SubjunctiveTense)
], Subjunctive.prototype, "active", void 0);
__decorate([
    type_graphql_1.Field(() => SubjunctiveTense),
    __metadata("design:type", SubjunctiveTense)
], Subjunctive.prototype, "passive", void 0);
Subjunctive = __decorate([
    type_graphql_1.ObjectType()
], Subjunctive);
exports.default = Subjunctive;
//# sourceMappingURL=Subjunctive.js.map