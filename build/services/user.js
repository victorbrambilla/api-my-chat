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
exports.register = exports.login = void 0;
const mongodb_1 = require("../libs/mongodb");
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!user.email) {
        throw new Error("Informe o campo email!");
    }
    if (!user.password) {
        throw new Error("Informe o campo senha!");
    }
    yield (0, mongodb_1.connect)();
    const userLogged = yield userModel_1.User.findOne({ email: user.email });
    if (!userLogged) {
        throw new Error("Cadastro não encontrado");
    }
    const userName = userLogged.name;
    const avatar = userLogged.avatar;
    if (bcryptjs_1.default.compareSync(user.password, userLogged.password) == false) {
        throw new Error("Senha incorreta!");
    }
    const token = (0, jsonwebtoken_1.sign)({
        _id: userLogged._id,
        name: userLogged.name,
        email: userLogged.email
    }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'emptyjwt', {});
    return { token, userName, avatar };
});
exports.login = login;
const register = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.name) {
        throw new Error("Informe o campo nome!");
    }
    if (!user.email) {
        throw new Error("Informe o campo email!");
    }
    if (!user.password) {
        throw new Error("Informe o campo senha!");
    }
    yield (0, mongodb_1.connect)();
    const userLogged = yield userModel_1.User.findOne({ email: user.email });
    if (userLogged) {
        throw new Error("Email já cadastrado!");
    }
    yield userModel_1.User.create(user);
    return true;
});
exports.register = register;
//# sourceMappingURL=user.js.map