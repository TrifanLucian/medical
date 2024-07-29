import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { ServiceFactory } from './ServiceFactory';
import { QuestionnaireQuestion } from '../models/QuestionnaireQuestion';

@Service()
export class QuestionnaireQuestionService extends BaseService<QuestionnaireQuestion> {
    constructor(factory: ServiceFactory) {
        super(QuestionnaireQuestion, factory.createService(QuestionnaireQuestion).getRelations(), factory.createService(QuestionnaireQuestion).getQueryRelations());
        factory.setRelations(QuestionnaireQuestion, ['questionnaire', 'question']);
        factory.setRelations(QuestionnaireQuestion, ['questionnaire', 'question', 'question.created_by', 'question.question_type'], 'deep');
    }
}
