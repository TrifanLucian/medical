"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicket_handler = void 0;
const ticket_1 = require("../../services/ticket");
const createTicket_handler = async (req, res) => {
    try {
        const data = req.body;
        const result = await (0, ticket_1.createTicket)(data);
        if (!result.success) {
            return res.status(404).json(result);
        }
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create ticket',
            errorType: 'InternalServerError',
            data: undefined,
        });
    }
};
exports.createTicket_handler = createTicket_handler;
//# sourceMappingURL=createTicket_handler.js.map