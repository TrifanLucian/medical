import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { ServiceFactory } from './ServiceFactory';
import { ActiveSession } from '../models/ActiveSession';

@Service()
export class ActiveSessionService extends BaseService<ActiveSession> {
    constructor(factory: ServiceFactory) {
        super(ActiveSession, factory.createService(ActiveSession).getRelations(), factory.createService(ActiveSession).getQueryRelations());
        factory.setRelations(ActiveSession, ['user']);
        factory.setRelations(ActiveSession, ['user', 'user.role'], 'deep');
    }
}
