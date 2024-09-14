"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const ActiveSession_1 = require("../models/ActiveSession");
const database_1 = require("../server/database");
// eslint-disable-next-line import/prefer-default-export
const checkToken = (req, res, next) => {
    const token = String(req.headers.authorization || req.body.token);
    const activeSessionRepository = database_1.connection.getRepository(ActiveSession_1.ActiveSession);
    activeSessionRepository.findOne({ token }, {
        relations: ['user'],
    }).then((session) => {
        req.sessionData = session;
        if (session === null || session === void 0 ? void 0 : session.token) {
            return next();
        }
        return res.json({ success: false, msg: 'User is not logged on' });
    });
};
exports.checkToken = checkToken;
//# sourceMappingURL=safeRoutes.js.map