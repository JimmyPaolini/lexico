"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Translation_1 = __importDefault(require("./entity/Translation"));
const Word_1 = __importDefault(require("./entity/Word"));
const script_1 = require("./script");
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield typeorm_1.createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "admin",
            password: "admin",
            database: "lexico",
            entities: [Word_1.default, Translation_1.default],
            migrations: ["src/migration/**/*.ts"],
            logging: true,
            synchronize: true,
        });
        const app = express_1.default();
        app.listen(4020, () => {
            console.log("app.ts listening on localhost:4020");
        });
        const em = connection.createEntityManager();
        yield script_1.script(em);
    });
}
//# sourceMappingURL=app%20copy.js.map