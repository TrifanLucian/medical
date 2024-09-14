"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSettings_handler = void 0;
const setting_1 = require("../../services/setting");
const getAllSettings_handler = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const scope = req.query.scope;
        const paginatedResult = await (0, setting_1.getAllSettings)(page, limit, scope);
        return res.json(paginatedResult);
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
exports.getAllSettings_handler = getAllSettings_handler;
//# sourceMappingURL=getAllSettings_handler.js.map