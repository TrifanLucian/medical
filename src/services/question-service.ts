import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { ServiceFactory } from './ServiceFactory';
import { Question } from '../models/Question';

@Service()
export class QuestionService extends BaseService<Question> {
    constructor(factory: ServiceFactory) {
        // Set relations first
        factory.setRelations(Question, ['question_type', 'created_by']);
        factory.setRelations(Question, ['question_type', 'created_by', 'created_by.role'], 'deep');

        // Now create the service with the updated relations
        const service = factory.createService(Question);

        super(Question, service.getRelations(), service.getQueryRelations());
    }
}
