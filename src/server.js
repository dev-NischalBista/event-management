"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const socketServer_1 = require("./socketServer");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const event_route_1 = __importDefault(require("./routes/event.route"));
const ticket_route_1 = __importDefault(require("./routes/ticket.route"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "3000", 10);
app.disable("x-powered-by");
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/auth", auth_route_1.default);
app.use("/api", user_route_1.default);
app.use("/api", event_route_1.default);
app.use("/api", ticket_route_1.default);
app.use(globalErrorHandler_1.globalErrorHandler);
const server = http_1.default.createServer(app);
(0, socketServer_1.initSocket)(server);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
