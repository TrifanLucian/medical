import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { ServiceFactory } from './ServiceFactory';
import { Choice } from '../models/Choice';

@Service()
export class ChoiceService extends BaseService<Choice> {
    constructor(factory: ServiceFactory) {
        super(Choice, factory.createService(Choice).getRelations(), factory.createService(Choice).getQueryRelations());
        factory.setRelations(Choice, ['question']);
        factory.setRelations(Choice, ['question', 'question.created_by', 'question.question_type'], 'deep');
    }
}
