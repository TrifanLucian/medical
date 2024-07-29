import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { ServiceFactory } from './ServiceFactory';
import { Question } from '../models/Question';

@Service()
export class QuestionService extends BaseService<Question> {
    constructor(factory: ServiceFactory) {
        super(Question, factory.createService(Question).getRelations(), factory.createService(Question).getQueryRelations());
        factory.setRelations(Question, ['question_type', 'created_by']);
        factory.setRelations(Question, ['question_type', 'created_by', 'created_by.role'], 'deep');
    }
}
