import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { ServiceFactory } from './ServiceFactory';
import { Setting } from '../models/Setting';

@Service()
export class SettingService extends BaseService<Setting> {
    constructor(factory: ServiceFactory) {
        super(Setting, factory.createService(Setting).getRelations(), factory.createService(Setting).getQueryRelations());
        factory.setRelations(Setting, []);
        factory.setRelations(Setting, [], 'deep');
    }
}
