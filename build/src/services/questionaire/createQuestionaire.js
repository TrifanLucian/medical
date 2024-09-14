"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionaire = void 0;
const typeorm_1 = require("typeorm");
const interpretDatabaseError_1 = require("../../utils/interpretDatabaseError");
const Questionnaire_1 = require("../../models/Questionnaire");
const createQuestionaire = async (data) => {
    const questionnaireRepository = (0, typeorm_1.getRepository)(Questionnaire_1.Questionnaire);
    try {
        if (!data.name) {
            throw new Error("Please tell questionnaire name");
        }
        if (!data.max_wrong_answers) {
            throw new Error("Max wrong answers is mandatory");
        }
        if (!data.type) {
            throw new Error("Type is mandatory");
        }
        // Create new ticket and attach customer
        const newQuestionnaire = questionnaireRepository.create({
            name: data.name,
            max_wrong_answers: data.max_wrong_answers,
            type: data.type,
        });
        await questionnaireRepository.save(newQuestionnaire);
        return { success: true, data: newQuestionnaire, error: null };
    }
    catch (error) {
        const interpretedError = (0, interpretDatabaseError_1.interpretDatabaseError)(error);
        return { success: false, data: null, error: interpretedError };
    }
};
exports.createQuestionaire = createQuestionaire;
//# sourceMappingURL=createQuestionaire.js.map