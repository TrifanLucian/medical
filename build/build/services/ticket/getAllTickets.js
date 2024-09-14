"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTickets = void 0;
const typeorm_1 = require("typeorm");
const Ticket_1 = require("../../models/Ticket");
const pagination_1 = require("../../utils/pagination");
const getAllTickets = async (page = 1, limit = 10) => {
    const ticketRepository = (0, typeorm_1.getRepository)(Ticket_1.Ticket);
    const options = {
        skip: (page - 1) * limit,
        take: limit,
        relations: [],
    };
    const [data, totalRecords] = await ticketRepository.findAndCount(options);
    return (0, pagination_1.paginate)(data, page, limit, totalRecords);
};
exports.getAllTickets = getAllTickets;
//# sourceMappingURL=getAllTickets.js.map