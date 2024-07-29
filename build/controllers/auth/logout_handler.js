"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const ActiveSession_1 = require("../../models/ActiveSession");
const database_1 = require("../../server/database");
const logout = (req, res) => {
    const { token } = req.body;
    const activeSessionRepository = database_1.connection.getRepository(ActiveSession_1.ActiveSession);
    activeSessionRepository.delete({ token })
        .then(() => res.json({ success: true }))
        .catch(() => {
        res.json({ success: false, msg: 'Token revoked' });
    });
};
exports.logout = logout;
//# sourceMappingURL=logout_handler.js.map