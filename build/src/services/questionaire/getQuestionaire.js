"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionaire = void 0;
const typeorm_1 = require("typeorm");
const interpretDatabaseError_1 = require("../../utils/interpretDatabaseError");
const Questionnaire_1 = require("../../models/Questionnaire");
const getQuestionaire = async (id) => {
    const questionaireRepository = (0, typeorm_1.getRepository)(Questionnaire_1.Questionnaire);
    try {
        const questionaire = await questionaireRepository.findOne(id, {
            relations: [],
        });
        if (!questionaire) {
            return { success: false, data: null, error: 'Questionaire not found' };
        }
        return { success: true, data: questionaire, error: null };
    }
    catch (error) {
        const interpretedError = (0, interpretDatabaseError_1.interpretDatabaseError)(error);
        return { success: false, data: null, error: interpretedError };
    }
};
exports.getQuestionaire = getQuestionaire;
//# sourceMappingURL=getQuestionaire.js.map