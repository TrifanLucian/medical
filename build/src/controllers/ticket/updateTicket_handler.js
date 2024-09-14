"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicket_handler = void 0;
const ticket_1 = require("../../services/ticket");
const updateTicket_handler = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await (0, ticket_1.updateTicket)(id, updateData);
        if (!result.success) {
            return res.status(404).json(result);
        }
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.updateTicket_handler = updateTicket_handler;
//# sourceMappingURL=updateTicket_handler.js.map