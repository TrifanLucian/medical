"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionaireRouter = void 0;
const express_1 = __importDefault(require("express"));
const questionaire_1 = require("../../../controllers/questionaire");
exports.questionaireRouter = express_1.default.Router();
// ticketRouter.post('/tickets', createTicket_handler);
// ticketRouter.get('/tickets', getAllTickets_handler);
exports.questionaireRouter.get('/questionaires/:id', questionaire_1.getQuestionaire_handler);
exports.questionaireRouter.post('/questionaires', questionaire_1.createQuestionnaire_handler);
// ticketRouter.delete('/tickets/:id', deleteTicket_handler);
//# sourceMappingURL=questionaire.js.map