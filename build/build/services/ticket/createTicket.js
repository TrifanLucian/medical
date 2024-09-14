"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicket = void 0;
const typeorm_1 = require("typeorm");
const Ticket_1 = require("../../models/Ticket");
const interpretDatabaseError_1 = require("../../utils/interpretDatabaseError");
const createTicket = async (data) => {
    const ticketRepository = (0, typeorm_1.getRepository)(Ticket_1.Ticket);
    try {
        if (!data.name) {
            throw new Error("Please tell us your name");
        }
        if (!data.phone) {
            throw new Error("Phone number is mandatory");
        }
        if (!data.message) {
            throw new Error("Message is mandatory");
        }
        // Try to find a customer by phone number or email
        const query = [
            { phone_number: data.phone },
        ];
        if (data.email) {
            query.push({ email: data.email });
        }
        // Create new ticket and attach customer
        const newTicket = ticketRepository.create({
            message: data.message,
            booking_code: data.booking_code,
        });
        await ticketRepository.save(newTicket);
        return { success: true, data: newTicket, error: null };
    }
    catch (error) {
        const interpretedError = (0, interpretDatabaseError_1.interpretDatabaseError)(error);
        return { success: false, data: null, error: interpretedError };
    }
};
exports.createTicket = createTicket;
//# sourceMappingURL=createTicket.js.map