"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = require("./database_config");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json()); // Add this line to enable JSON parsing in the request
(0, database_config_1.initializeDatabase)();
app.get('/', (req, res) => {
    res.send('Hello, TypeScript Express!');
});
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
