"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = void 0;
const typeorm_1 = require("typeorm");
const Ticket_1 = require("../../models/Ticket");
const interpretDatabaseError_1 = require("../../utils/interpretDatabaseError");
const deleteTicket = async (id) => {
    const ticketRepository = (0, typeorm_1.getRepository)(Ticket_1.Ticket);
    try {
        const deleteResult = await ticketRepository.delete(id);
        if (deleteResult.affected === 0) {
            return { success: false, data: null, error: 'Ticket not found' };
        }
        return { success: true, data: { id }, error: null };
    }
    catch (error) {
        const interpretedError = (0, interpretDatabaseError_1.interpretDatabaseError)(error);
        return { success: false, data: null, error: interpretedError };
    }
};
exports.deleteTicket = deleteTicket;
//# sourceMappingURL=deleteTicket.js.map