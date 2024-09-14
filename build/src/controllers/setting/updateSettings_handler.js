"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings_handler = void 0;
const setting_1 = require("../../services/setting");
const updateSettings_handler = async (req, res) => {
    try {
        const data = req.body;
        const result = await (0, setting_1.updateSettings)(data);
        if (!result.success) {
            return res.status(404).json(result);
        }
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.updateSettings_handler = updateSettings_handler;
//# sourceMappingURL=updateSettings_handler.js.map