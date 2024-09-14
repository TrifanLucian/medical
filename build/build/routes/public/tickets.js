"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicTicketRouter = void 0;
const express_1 = __importDefault(require("express"));
const ticket_1 = require("../../controllers/ticket");
exports.publicTicketRouter = express_1.default.Router();
exports.publicTicketRouter.post('/tickets', ticket_1.createTicket_handler);
//# sourceMappingURL=tickets.js.map