import { getRepository } from 'typeorm';
import { interpretDatabaseError } from '../../utils/interpretDatabaseError';
import { Questionnaire } from '../../models/Questionnaire';

export const getQuestionaire = async (id: string) => {
  const questionaireRepository = getRepository(Questionnaire);
  try {
    const questionaire = await questionaireRepository.findOne(id, {
      relations: [],
    });
    if (!questionaire) {
      return { success: false, data: null, error: 'Questionaire not found' };
    }
    return { success: true, data: questionaire, error: null };
  } catch (error) {
    const interpretedError = interpretDatabaseError(error);
    return { success: false, data: null, error: interpretedError };
  }
};
