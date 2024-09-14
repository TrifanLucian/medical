"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRouter = void 0;
const express_1 = __importDefault(require("express"));
const ticket_1 = require("../../../controllers/ticket");
exports.ticketRouter = express_1.default.Router();
exports.ticketRouter.post('/tickets', ticket_1.createTicket_handler);
exports.ticketRouter.get('/tickets', ticket_1.getAllTickets_handler);
exports.ticketRouter.get('/tickets/:id', ticket_1.getTicket_handler);
exports.ticketRouter.put('/tickets/:id', ticket_1.updateTicket_handler);
exports.ticketRouter.delete('/tickets/:id', ticket_1.deleteTicket_handler);
//# sourceMappingURL=ticket.js.map