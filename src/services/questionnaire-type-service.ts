import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { ServiceFactory } from './ServiceFactory';
import { QuestionnaireType } from '../models/QuestionnaireType';

@Service()
export class QuestionnaireTypeService extends BaseService<QuestionnaireType> {
    constructor(factory: ServiceFactory) {
        super(QuestionnaireType, factory.createService(QuestionnaireType).getRelations(), factory.createService(QuestionnaireType).getQueryRelations());
        factory.setRelations(QuestionnaireType, []);
        factory.setRelations(QuestionnaireType, [], 'deep');
    }
}
