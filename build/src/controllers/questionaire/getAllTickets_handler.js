"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTickets_handler = void 0;
const ticket_1 = require("../../services/ticket");
const getAllTickets_handler = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const paginatedResult = await (0, ticket_1.getAllTickets)(page, limit);
        return res.json(paginatedResult);
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
exports.getAllTickets_handler = getAllTickets_handler;
//# sourceMappingURL=getAllTickets_handler.js.map