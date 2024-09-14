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
// import {rateLimit} from 'express-rate-limit'
// import { checkToken } from '../config/safeRoutes';
const passport_2 = __importDefault(require("../config/passport"));
const _old_1 = require("../routes/admin/_old");
// import mapAndCreateEndpoints from '../routes/admin';
const public_1 = require("../routes/public");
const database_1 = require("./database");
// Instantiate rate limiter
// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 1 minute
//     limit: 3, // Limit each IP to  requests per `window` (here, per 1 minute).
//     standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
//     // store: ... , // Redis, Memcached, etc. See below.
// });
// Instantiate express
const server = (0, express_1.default)();
server.use((0, compression_1.default)());
// Passport Config
(0, passport_2.default)(passport_1.default);
server.use(passport_1.default.initialize());
// Connect to sqlite
if (process.env.NODE_ENV !== 'test') {
    (0, database_1.connect)().then(_r => {
        server.use((0, cors_1.default)());
        server.use(express_1.default.json());
        // Initialize admin routes middleware
        server.use('/v1/admin/auth', _old_1.authRouter);
        server.use('/v1/admin/questionaire', _old_1.questionaireRouter);
        // server.use('/v1', limiter, mapAndCreateEndpoints());
        // server.use('/v1', mapAndCreateEndpoints());
        // server.use('/v1/admin', checkToken, ticketRouter);
        // server.use('/v1/admin', checkToken, settingRouter);
        // Initialize public routes middleware
        server.use('/v1/public', public_1.publicTicketRouter);
    });
}
exports.default = server;
//# sourceMappingURL=index.js.map