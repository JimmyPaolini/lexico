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
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const apolloServer_config_1 = __importDefault(require("./apolloServer.config"));
const index_1 = __importDefault(require("./ingestion/dictionary/index"));
const index_test_1 = __importDefault(require("./ingestion/dictionary/index.test"));
const typeorm_config_1 = __importDefault(require("./typeorm.config"));
const clearDatabase_1 = __importDefault(require("./utils/clearDatabase"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield typeorm_1.createConnection(typeorm_config_1.default);
        const app = express_1.default();
        app.listen(2048);
        app.use(express_1.default.json());
        const api = new apollo_server_express_1.ApolloServer(yield apolloServer_config_1.default());
        api.applyMiddleware({ app });
        app.get("/clear-database", clearDatabase_1.default);
        app.post("/ingest-word", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                yield index_test_1.default(req.body.latin);
                res.status(200).send();
            }
            catch (e) {
                res.status(500).send(e);
            }
        }));
        app.post("/ingest-all", (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield index_1.default();
            try {
                yield index_1.default(req.body.firstLetter, req.body.lastLetter);
                res.status(200).send();
            }
            catch (e) {
                res.status(500).send(e);
            }
        }));
    });
}
main();
//# sourceMappingURL=app.js.map