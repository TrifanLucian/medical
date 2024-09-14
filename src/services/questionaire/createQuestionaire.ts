import { getRepository } from 'typeorm';
import { interpretDatabaseError } from '../../utils/interpretDatabaseError';
import { Questionnaire } from '../../models/Questionnaire';

export const createQuestionaire = async (data: Partial<Questionnaire> & { max_wrong_answers: number; type: string; name: string }) => {
  const questionnaireRepository = getRepository(Questionnaire);

  try {

    if (!data.name) {
      throw new Error("Please tell questionnaire name");
    }

    if (!data.max_wrong_answers) {
      throw new Error("Max wrong answers is mandatory");
    }

    // Create new ticket and attach customer
    const newQuestionnaire = questionnaireRepository.create({
      name: data.name,
      max_wrong_answers: data.max_wrong_answers,
      type: data.type,
    });
    await questionnaireRepository.save(newQuestionnaire);
    return { success: true, data: newQuestionnaire, error: null };
  } catch (error: any) {
    const interpretedError = interpretDatabaseError(error);
    return { success: false, data: null, error: interpretedError };
  }
};