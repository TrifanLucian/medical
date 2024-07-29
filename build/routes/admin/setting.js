"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingRouter = void 0;
const express_1 = __importDefault(require("express"));
const setting_1 = require("../../controllers/setting");
exports.settingRouter = express_1.default.Router();
exports.settingRouter.get('/settings', setting_1.getAllSettings_handler);
exports.settingRouter.put('/settings', setting_1.updateSettings_handler);
//# sourceMappingURL=setting.js.map