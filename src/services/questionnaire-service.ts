import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { ServiceFactory } from './ServiceFactory';
import { Questionnaire } from '../models/Questionnaire';

@Service()
export class QuestionnaireService extends BaseService<Questionnaire> {
    constructor(factory: ServiceFactory) {
        super(Questionnaire, factory.createService(Questionnaire).getRelations(), factory.createService(Questionnaire).getQueryRelations());
        factory.setRelations(Questionnaire, ['type', 'created_by']);
        factory.setRelations(Questionnaire, ['type', 'created_by', 'created_by.role'], 'deep');
    }
}
