import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { ServiceFactory } from './ServiceFactory';
import { Role } from '../models/Role';

@Service()
export class RoleService extends BaseService<Role> {
    constructor(factory: ServiceFactory) {
        super(Role, factory.createService(Role).getRelations(), factory.createService(Role).getQueryRelations());
        factory.setRelations(Role, ['users']);
        factory.setRelations(Role, ['users', 'users.role'], 'deep');
    }
}
