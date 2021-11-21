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
exports.isLogged = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const isLogged = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!req.headers.token) {
        return res.status(401).json({ message: "Você não está logado!" });
    }
    try {
        const payload = (0, jsonwebtoken_1.verify)((_a = req.headers.token) === null || _a === void 0 ? void 0 : _a.toString(), (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : 'emptyjwt');
        req.user = payload;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.isLogged = isLogged;
//# sourceMappingURL=middlewareLogin.js.map