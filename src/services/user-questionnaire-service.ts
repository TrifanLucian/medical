import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { ServiceFactory } from './ServiceFactory';
import { UserQuestionnaire } from '../models/UserQuestionnaire';

@Service()
export class UserQuestionnaireService extends BaseService<UserQuestionnaire> {
    constructor(factory: ServiceFactory) {
        super(UserQuestionnaire, factory.createService(UserQuestionnaire).getRelations(), factory.createService(UserQuestionnaire).getQueryRelations());
        factory.setRelations(UserQuestionnaire, ['user', 'questionnaire']);
        factory.setRelations(UserQuestionnaire, ['user', 'user.role', 'questionnaire', 'questionnaire.type', 'questionnaire.created_by'], 'deep');
    }
}
