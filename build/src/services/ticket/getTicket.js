"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicket = void 0;
const typeorm_1 = require("typeorm");
const Ticket_1 = require("../../models/Ticket");
const interpretDatabaseError_1 = require("../../utils/interpretDatabaseError");
const getTicket = async (id) => {
    const ticketRepository = (0, typeorm_1.getRepository)(Ticket_1.Ticket);
    try {
        const ticket = await ticketRepository.findOne(id, {
            relations: [],
        });
        if (!ticket) {
            return { success: false, data: null, error: 'Ticket not found' };
        }
        return { success: true, data: ticket, error: null };
    }
    catch (error) {
        const interpretedError = (0, interpretDatabaseError_1.interpretDatabaseError)(error);
        return { success: false, data: null, error: interpretedError };
    }
};
exports.getTicket = getTicket;
//# sourceMappingURL=getTicket.js.map