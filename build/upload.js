"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storageConfig = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/build/public/");
    },
    filename: function (req, file, cb) {
        let randomName = Math.floor(Math.random() * 9999);
        cb(null, `${randomName}.jpg`);
    }
});
const upload = (0, multer_1.default)({
    storage: storageConfig,
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpg', 'image/jpeg', 'image/png'];
        cb(null, allowed.includes(file.mimetype));
    },
});
exports.default = upload;
//# sourceMappingURL=upload.js.map