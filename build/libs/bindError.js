"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const error = (res, error) => {
    return res.status(400).json({ message: error.message });
};
exports.error = error;
//# sourceMappingURL=bindError.js.map