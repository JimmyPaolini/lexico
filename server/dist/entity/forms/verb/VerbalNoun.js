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
exports.Supine = exports.Gerund = void 0;
const type_graphql_1 = require("type-graphql");
let Gerund = class Gerund {
};
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], Gerund.prototype, "genitive", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], Gerund.prototype, "dative", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], Gerund.prototype, "accusative", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], Gerund.prototype, "ablative", void 0);
Gerund = __decorate([
    type_graphql_1.ObjectType()
], Gerund);
exports.Gerund = Gerund;
let Supine = class Supine {
};
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], Supine.prototype, "accusative", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], Supine.prototype, "ablative", void 0);
Supine = __decorate([
    type_graphql_1.ObjectType()
], Supine);
exports.Supine = Supine;
let VerbalNoun = class VerbalNoun {
};
__decorate([
    type_graphql_1.Field(() => Gerund),
    __metadata("design:type", Gerund)
], VerbalNoun.prototype, "gerund", void 0);
__decorate([
    type_graphql_1.Field(() => Supine),
    __metadata("design:type", Supine)
], VerbalNoun.prototype, "supine", void 0);
VerbalNoun = __decorate([
    type_graphql_1.ObjectType()
], VerbalNoun);
exports.default = VerbalNoun;
//# sourceMappingURL=VerbalNoun.js.map