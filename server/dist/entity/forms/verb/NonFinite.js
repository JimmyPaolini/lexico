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
exports.NonFiniteParticiple = exports.NonFiniteInfinitive = exports.NonFinitePerfectFuture = exports.NonFinitePresentFuture = exports.NonFinitePresentPerfectFuture = void 0;
const type_graphql_1 = require("type-graphql");
let NonFinitePresentPerfectFuture = class NonFinitePresentPerfectFuture {
};
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], NonFinitePresentPerfectFuture.prototype, "present", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], NonFinitePresentPerfectFuture.prototype, "perfect", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], NonFinitePresentPerfectFuture.prototype, "future", void 0);
NonFinitePresentPerfectFuture = __decorate([
    type_graphql_1.ObjectType()
], NonFinitePresentPerfectFuture);
exports.NonFinitePresentPerfectFuture = NonFinitePresentPerfectFuture;
let NonFinitePresentFuture = class NonFinitePresentFuture {
};
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], NonFinitePresentFuture.prototype, "present", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], NonFinitePresentFuture.prototype, "future", void 0);
NonFinitePresentFuture = __decorate([
    type_graphql_1.ObjectType()
], NonFinitePresentFuture);
exports.NonFinitePresentFuture = NonFinitePresentFuture;
let NonFinitePerfectFuture = class NonFinitePerfectFuture {
};
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], NonFinitePerfectFuture.prototype, "perfect", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], NonFinitePerfectFuture.prototype, "future", void 0);
NonFinitePerfectFuture = __decorate([
    type_graphql_1.ObjectType()
], NonFinitePerfectFuture);
exports.NonFinitePerfectFuture = NonFinitePerfectFuture;
let NonFiniteInfinitive = class NonFiniteInfinitive {
};
__decorate([
    type_graphql_1.Field(() => NonFinitePresentPerfectFuture),
    __metadata("design:type", NonFinitePresentPerfectFuture)
], NonFiniteInfinitive.prototype, "active", void 0);
__decorate([
    type_graphql_1.Field(() => NonFinitePresentPerfectFuture),
    __metadata("design:type", NonFinitePresentPerfectFuture)
], NonFiniteInfinitive.prototype, "passive", void 0);
NonFiniteInfinitive = __decorate([
    type_graphql_1.ObjectType()
], NonFiniteInfinitive);
exports.NonFiniteInfinitive = NonFiniteInfinitive;
let NonFiniteParticiple = class NonFiniteParticiple {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", NonFinitePresentFuture)
], NonFiniteParticiple.prototype, "active", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", NonFinitePerfectFuture)
], NonFiniteParticiple.prototype, "passive", void 0);
NonFiniteParticiple = __decorate([
    type_graphql_1.ObjectType()
], NonFiniteParticiple);
exports.NonFiniteParticiple = NonFiniteParticiple;
let NonFinite = class NonFinite {
};
__decorate([
    type_graphql_1.Field(() => NonFiniteInfinitive),
    __metadata("design:type", NonFiniteInfinitive)
], NonFinite.prototype, "infinitive", void 0);
__decorate([
    type_graphql_1.Field(() => NonFiniteParticiple),
    __metadata("design:type", NonFiniteParticiple)
], NonFinite.prototype, "participle", void 0);
NonFinite = __decorate([
    type_graphql_1.ObjectType()
], NonFinite);
exports.default = NonFinite;
//# sourceMappingURL=NonFinite.js.map