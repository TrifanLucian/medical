import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { ServiceFactory } from './ServiceFactory';
import { UserQuestion } from '../models/UserQuestion';

@Service()
export class UserQuestionService extends BaseService<UserQuestion> {
    constructor(factory: ServiceFactory) {
        super(UserQuestion, factory.createService(UserQuestion).getRelations(), factory.createService(UserQuestion).getQueryRelations());
        factory.setRelations(UserQuestion, ['user', 'question']);
        factory.setRelations(UserQuestion, ['user', 'user.role', 'question', 'question.created_by', 'question.question_type'], 'deep');
    }
}
