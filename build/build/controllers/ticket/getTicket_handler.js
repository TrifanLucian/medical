"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicket_handler = void 0;
const ticket_1 = require("../../services/ticket");
const getTicket_handler = async (req, res) => {
    const { id } = req.params;
    const response = await (0, ticket_1.getTicket)(id);
    if (!response.success) {
        return res.status(404).json(response);
    }
    return res.json(response);
};
exports.getTicket_handler = getTicket_handler;
//# sourceMappingURL=getTicket_handler.js.map