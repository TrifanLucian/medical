"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionnaire_handler = void 0;
const questionaire_1 = require("../../services/questionaire");
const createQuestionnaire_handler = async (req, res) => {
    try {
        const data = req.body;
        const result = await (0, questionaire_1.createQuestionaire)(data);
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
exports.createQuestionnaire_handler = createQuestionnaire_handler;
//# sourceMappingURL=createQuestionnaire_handler.js.map