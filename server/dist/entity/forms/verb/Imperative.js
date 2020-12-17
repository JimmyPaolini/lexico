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
exports.ImperativePassive = exports.ImperativeActive = exports.ImperativePassiveFuture = exports.ImperativeActiveFuture = exports.ImperativePresent = exports.ImperativeThird = exports.ImperativeSecond = exports.ImperativeSecondThird = void 0;
const type_graphql_1 = require("type-graphql");
let ImperativeSecondThird = class ImperativeSecondThird {
};
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], ImperativeSecondThird.prototype, "second", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], ImperativeSecondThird.prototype, "third", void 0);
ImperativeSecondThird = __decorate([
    type_graphql_1.ObjectType()
], ImperativeSecondThird);
exports.ImperativeSecondThird = ImperativeSecondThird;
let ImperativeSecond = class ImperativeSecond {
};
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], ImperativeSecond.prototype, "second", void 0);
ImperativeSecond = __decorate([
    type_graphql_1.ObjectType()
], ImperativeSecond);
exports.ImperativeSecond = ImperativeSecond;
let ImperativeThird = class ImperativeThird {
};
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], ImperativeThird.prototype, "third", void 0);
ImperativeThird = __decorate([
    type_graphql_1.ObjectType()
], ImperativeThird);
exports.ImperativeThird = ImperativeThird;
let ImperativePresent = class ImperativePresent {
};
__decorate([
    type_graphql_1.Field(() => ImperativeSecond),
    __metadata("design:type", ImperativeSecond)
], ImperativePresent.prototype, "singular", void 0);
__decorate([
    type_graphql_1.Field(() => ImperativeSecond),
    __metadata("design:type", ImperativeSecond)
], ImperativePresent.prototype, "plural", void 0);
ImperativePresent = __decorate([
    type_graphql_1.ObjectType()
], ImperativePresent);
exports.ImperativePresent = ImperativePresent;
let ImperativeActiveFuture = class ImperativeActiveFuture {
};
__decorate([
    type_graphql_1.Field(() => ImperativeSecondThird),
    __metadata("design:type", ImperativeSecondThird)
], ImperativeActiveFuture.prototype, "singular", void 0);
__decorate([
    type_graphql_1.Field(() => ImperativeSecondThird),
    __metadata("design:type", ImperativeSecondThird)
], ImperativeActiveFuture.prototype, "plural", void 0);
ImperativeActiveFuture = __decorate([
    type_graphql_1.ObjectType()
], ImperativeActiveFuture);
exports.ImperativeActiveFuture = ImperativeActiveFuture;
let ImperativePassiveFuture = class ImperativePassiveFuture {
};
__decorate([
    type_graphql_1.Field(() => ImperativeSecondThird),
    __metadata("design:type", ImperativeSecondThird)
], ImperativePassiveFuture.prototype, "singular", void 0);
__decorate([
    type_graphql_1.Field(() => ImperativeThird),
    __metadata("design:type", ImperativeThird)
], ImperativePassiveFuture.prototype, "plural", void 0);
ImperativePassiveFuture = __decorate([
    type_graphql_1.ObjectType()
], ImperativePassiveFuture);
exports.ImperativePassiveFuture = ImperativePassiveFuture;
let ImperativeActive = class ImperativeActive {
};
__decorate([
    type_graphql_1.Field(() => ImperativePresent),
    __metadata("design:type", ImperativePresent)
], ImperativeActive.prototype, "present", void 0);
__decorate([
    type_graphql_1.Field(() => ImperativeActiveFuture),
    __metadata("design:type", ImperativeActiveFuture)
], ImperativeActive.prototype, "future", void 0);
ImperativeActive = __decorate([
    type_graphql_1.ObjectType()
], ImperativeActive);
exports.ImperativeActive = ImperativeActive;
let ImperativePassive = class ImperativePassive {
};
__decorate([
    type_graphql_1.Field(() => ImperativePresent),
    __metadata("design:type", ImperativePresent)
], ImperativePassive.prototype, "present", void 0);
__decorate([
    type_graphql_1.Field(() => ImperativePassiveFuture),
    __metadata("design:type", ImperativePassiveFuture)
], ImperativePassive.prototype, "future", void 0);
ImperativePassive = __decorate([
    type_graphql_1.ObjectType()
], ImperativePassive);
exports.ImperativePassive = ImperativePassive;
let Imperative = class Imperative {
};
__decorate([
    type_graphql_1.Field(() => ImperativeActive),
    __metadata("design:type", ImperativeActive)
], Imperative.prototype, "active", void 0);
__decorate([
    type_graphql_1.Field(() => ImperativePassive),
    __metadata("design:type", ImperativePassive)
], Imperative.prototype, "passive", void 0);
Imperative = __decorate([
    type_graphql_1.ObjectType()
], Imperative);
exports.default = Imperative;
//# sourceMappingURL=Imperative.js.map