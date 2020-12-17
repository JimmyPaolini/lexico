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
exports.IndicativeTense = exports.IndicativeNumber = exports.IndicativePerson = void 0;
const type_graphql_1 = require("type-graphql");
let IndicativePerson = class IndicativePerson {
};
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], IndicativePerson.prototype, "first", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], IndicativePerson.prototype, "second", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], IndicativePerson.prototype, "third", void 0);
IndicativePerson = __decorate([
    type_graphql_1.ObjectType()
], IndicativePerson);
exports.IndicativePerson = IndicativePerson;
let IndicativeNumber = class IndicativeNumber {
};
__decorate([
    type_graphql_1.Field(() => IndicativePerson),
    __metadata("design:type", IndicativePerson)
], IndicativeNumber.prototype, "singular", void 0);
__decorate([
    type_graphql_1.Field(() => IndicativePerson),
    __metadata("design:type", IndicativePerson)
], IndicativeNumber.prototype, "plural", void 0);
IndicativeNumber = __decorate([
    type_graphql_1.ObjectType()
], IndicativeNumber);
exports.IndicativeNumber = IndicativeNumber;
let IndicativeTense = class IndicativeTense {
};
__decorate([
    type_graphql_1.Field(() => IndicativeNumber),
    __metadata("design:type", IndicativeNumber)
], IndicativeTense.prototype, "present", void 0);
__decorate([
    type_graphql_1.Field(() => IndicativeNumber),
    __metadata("design:type", IndicativeNumber)
], IndicativeTense.prototype, "imperfect", void 0);
__decorate([
    type_graphql_1.Field(() => IndicativeNumber),
    __metadata("design:type", IndicativeNumber)
], IndicativeTense.prototype, "future", void 0);
__decorate([
    type_graphql_1.Field(() => IndicativeNumber),
    __metadata("design:type", IndicativeNumber)
], IndicativeTense.prototype, "perfect", void 0);
__decorate([
    type_graphql_1.Field(() => IndicativeNumber),
    __metadata("design:type", IndicativeNumber)
], IndicativeTense.prototype, "pluperfect", void 0);
__decorate([
    type_graphql_1.Field(() => IndicativeNumber),
    __metadata("design:type", IndicativeNumber)
], IndicativeTense.prototype, "futurePerfect", void 0);
IndicativeTense = __decorate([
    type_graphql_1.ObjectType()
], IndicativeTense);
exports.IndicativeTense = IndicativeTense;
let Indicative = class Indicative {
};
__decorate([
    type_graphql_1.Field(() => IndicativeTense),
    __metadata("design:type", IndicativeTense)
], Indicative.prototype, "active", void 0);
__decorate([
    type_graphql_1.Field(() => IndicativeTense),
    __metadata("design:type", IndicativeTense)
], Indicative.prototype, "passive", void 0);
Indicative = __decorate([
    type_graphql_1.ObjectType()
], Indicative);
exports.default = Indicative;
//# sourceMappingURL=Indicative.js.map