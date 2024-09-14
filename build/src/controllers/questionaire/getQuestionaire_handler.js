"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionaire_handler = void 0;
const questionaire_1 = require("../../services/questionaire");
const getQuestionaire_handler = async (req, res) => {
    const { id } = req.params;
    const response = await (0, questionaire_1.getQuestionaire)(id);
    if (!response.success) {
        return res.status(404).json(response);
    }
    return res.json(response);
};
exports.getQuestionaire_handler = getQuestionaire_handler;
//# sourceMappingURL=getQuestionaire_handler.js.map