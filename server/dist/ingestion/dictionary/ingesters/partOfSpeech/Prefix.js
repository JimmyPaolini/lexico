"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Adjective_1 = __importDefault(require("./Adjective"));
class Prefix extends Adjective_1.default {
    ingestInflection() {
        return "";
    }
    ingestForms() {
        return null;
    }
}
exports.default = Prefix;
//# sourceMappingURL=Prefix.js.map