import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { ServiceFactory } from './ServiceFactory';
import { QuestionType } from '../models/QuestionType';

@Service()
export class QuestionTypeService extends BaseService<QuestionType> {
    constructor(factory: ServiceFactory) {
        super(QuestionType, factory.createService(QuestionType).getRelations(), factory.createService(QuestionType).getQueryRelations());
        factory.setRelations(QuestionType, []);
        factory.setRelations(QuestionType, [], 'deep');
    }
}
