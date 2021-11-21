"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const date_1 = __importDefault(require("./date"));
const user = __importStar(require("./controllers/user"));
const middlewareLogin_1 = require("./libs/middlewareLogin");
const upload_1 = __importDefault(require("./upload"));
const path_1 = __importDefault(require("path"));
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = 3000;
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
});
app.post('/login', user.login);
app.post('/users', upload_1.default.single('avatar'), user.register);
app.post('/photo', middlewareLogin_1.isLogged, upload_1.default.single('foto'), (req, res) => {
    try {
        const message = {
            name: req.body.name,
            user: req.body.user,
            message: req.body.message,
            date: (0, date_1.default)(new Date()),
            img: `http://3.144.187.146:3000/public/${req.file.filename}`
        };
        messages.push({ message });
        io.emit('message', messages);
    }
    catch (error) {
        throw new Error('error');
    }
});
let users = [];
let messages = [];
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (message) => {
        messages.push({ message });
        io.emit('message', messages);
    });
    socket.on('disconnecting', () => {
        users = users.filter((u) => u != socket.username);
        io.emit('join', users);
    });
    socket.on('join', (user) => {
        socket.username = user;
        users.push(user);
        io.emit('join', users);
        io.emit('message', messages);
    });
});
httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`));
//# sourceMappingURL=index.js.map
