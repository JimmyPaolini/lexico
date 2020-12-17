"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const AdjectiveForms_1 = __importDefault(require("./AdjectiveForms"));
const NounForms_1 = __importDefault(require("./NounForms"));
const VerbForms_1 = __importDefault(require("./verb/VerbForms"));
const FormsUnion = type_graphql_1.createUnionType({
    name: "Forms",
    types: () => [NounForms_1.default, VerbForms_1.default, AdjectiveForms_1.default],
    resolveType: (value) => {
        if ("indicative" in value)
            return VerbForms_1.default;
        else if ("nominative" in value) {
            if ("masculine" in value.nominative.singular)
                return AdjectiveForms_1.default;
            else
                return NounForms_1.default;
        }
        else
            return undefined;
    },
});
exports.default = FormsUnion;
//# sourceMappingURL=Forms.js.map