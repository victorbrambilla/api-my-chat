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
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = void 0;
const mongoose_1 = require("mongoose");
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.DATABASE_URL)
        throw new Error('As variáveis de ambiente em .env não foram definidas para a conexão com o banco de dados!');
    const isAlreadyConnected = mongoose_1.connection.readyState === 1;
    if (isAlreadyConnected) {
        return mongoose_1.connection;
    }
    const mongoConfig = {
        ignoreUndefined: true
    };
    return (0, mongoose_1.connect)(process.env.DATABASE_URL, mongoConfig);
});
exports.connect = connect;
const disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.disconnect)();
});
exports.disconnect = disconnect;
//# sourceMappingURL=mongodb.js.map