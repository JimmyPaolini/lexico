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
exports.AdjectiveSgPl = exports.MascFemNeu = void 0;
const type_graphql_1 = require("type-graphql");
let MascFemNeu = class MascFemNeu {
};
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], MascFemNeu.prototype, "masculine", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], MascFemNeu.prototype, "feminine", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], MascFemNeu.prototype, "neuter", void 0);
MascFemNeu = __decorate([
    type_graphql_1.ObjectType()
], MascFemNeu);
exports.MascFemNeu = MascFemNeu;
let AdjectiveSgPl = class AdjectiveSgPl {
};
__decorate([
    type_graphql_1.Field(() => MascFemNeu),
    __metadata("design:type", MascFemNeu)
], AdjectiveSgPl.prototype, "singular", void 0);
__decorate([
    type_graphql_1.Field(() => MascFemNeu),
    __metadata("design:type", MascFemNeu)
], AdjectiveSgPl.prototype, "plural", void 0);
AdjectiveSgPl = __decorate([
    type_graphql_1.ObjectType()
], AdjectiveSgPl);
exports.AdjectiveSgPl = AdjectiveSgPl;
let AdjectiveForms = class AdjectiveForms {
};
__decorate([
    type_graphql_1.Field(() => AdjectiveSgPl),
    __metadata("design:type", AdjectiveSgPl)
], AdjectiveForms.prototype, "nominative", void 0);
__decorate([
    type_graphql_1.Field(() => AdjectiveSgPl),
    __metadata("design:type", AdjectiveSgPl)
], AdjectiveForms.prototype, "genitive", void 0);
__decorate([
    type_graphql_1.Field(() => AdjectiveSgPl),
    __metadata("design:type", AdjectiveSgPl)
], AdjectiveForms.prototype, "dative", void 0);
__decorate([
    type_graphql_1.Field(() => AdjectiveSgPl),
    __metadata("design:type", AdjectiveSgPl)
], AdjectiveForms.prototype, "accusative", void 0);
__decorate([
    type_graphql_1.Field(() => AdjectiveSgPl),
    __metadata("design:type", AdjectiveSgPl)
], AdjectiveForms.prototype, "ablative", void 0);
__decorate([
    type_graphql_1.Field(() => AdjectiveSgPl),
    __metadata("design:type", AdjectiveSgPl)
], AdjectiveForms.prototype, "vocative", void 0);
__decorate([
    type_graphql_1.Field(() => AdjectiveSgPl),
    __metadata("design:type", AdjectiveSgPl)
], AdjectiveForms.prototype, "locative", void 0);
AdjectiveForms = __decorate([
    type_graphql_1.ObjectType()
], AdjectiveForms);
exports.default = AdjectiveForms;
//# sourceMappingURL=AdjectiveForms.js.map