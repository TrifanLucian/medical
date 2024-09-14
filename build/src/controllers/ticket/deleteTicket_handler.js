"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket_handler = void 0;
const ticket_1 = require("../../services/ticket");
const deleteTicket_handler = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, ticket_1.deleteTicket)(id);
        if (!result.success) {
            return res.status(404).json(result);
        }
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.deleteTicket_handler = deleteTicket_handler;
//# sourceMappingURL=deleteTicket_handler.js.map