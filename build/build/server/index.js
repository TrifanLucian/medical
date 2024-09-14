"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_rate_limit_1 = require("express-rate-limit");
const safeRoutes_1 = require("../config/safeRoutes");
const passport_2 = __importDefault(require("../config/passport"));
const admin_1 = require("../routes/admin");
const public_1 = require("../routes/public");
const database_1 = require("./database");
// Instantiate rate limiter
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 1 * 60 * 1000,
    limit: 3,
    standardHeaders: 'draft-7',
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
});
// Instantiate express
const server = (0, express_1.default)();
server.use((0, compression_1.default)());
// Passport Config
(0, passport_2.default)(passport_1.default);
server.use(passport_1.default.initialize());
// Connect to sqlite
if (process.env.NODE_ENV !== 'test') {
    (0, database_1.connect)();
}
server.use((0, cors_1.default)());
server.use(express_1.default.json());
// Initialize admin routes middleware
server.use('/v1/admin/auth', limiter, admin_1.authRouter);
server.use('/v1/admin', safeRoutes_1.checkToken, admin_1.ticketRouter);
server.use('/v1/admin', safeRoutes_1.checkToken, admin_1.settingRouter);
// Initialize public routes middleware
server.use('/v1/public', public_1.publicTicketRouter);
exports.default = server;
//# sourceMappingURL=index.js.map