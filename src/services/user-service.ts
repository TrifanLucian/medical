import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { ServiceFactory } from './ServiceFactory';
import { User } from '../models/User';

@Service()
export class UserService extends BaseService<User> {
    constructor(factory: ServiceFactory) {
        super(User, factory.createService(User).getRelations(), factory.createService(User).getQueryRelations());
        factory.setRelations(User, ['role']);
        factory.setRelations(User, ['role', 'role.users'], 'deep');
    }
}
