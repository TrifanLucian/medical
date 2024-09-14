"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicket = void 0;
const typeorm_1 = require("typeorm");
const Ticket_1 = require("../../models/Ticket");
const interpretDatabaseError_1 = require("../../utils/interpretDatabaseError");
const updateTicket = async (id, data) => {
    const ticketRepository = (0, typeorm_1.getRepository)(Ticket_1.Ticket);
    try {
        const ticket = await ticketRepository.findOne(id);
        if (!ticket) {
            return { success: false, data: null, error: 'Ticket not found' };
        }
        ticketRepository.merge(ticket, data);
        const updatedTicket = await ticketRepository.save(ticket);
        return { success: true, data: updatedTicket, error: null };
    }
    catch (error) {
        const interpretedError = (0, interpretDatabaseError_1.interpretDatabaseError)(error);
        return { success: false, data: null, error: interpretedError };
    }
};
exports.updateTicket = updateTicket;
//# sourceMappingURL=updateTicket.js.map