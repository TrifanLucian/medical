import { BaseService } from '../services/BaseService';
import { BaseController } from './BaseController';
import { EntityTarget, ObjectLiteral } from 'typeorm';

export class ControllerFactory {
    private services: { [key: string]: BaseService<any> };

    constructor(services: { [key: string]: BaseService<any> }) {
        this.services = services;
    }

    createController<T extends ObjectLiteral>(
        entity: EntityTarget<T>,
        overrides: Partial<BaseController<T>> = {}
    ): BaseController<T> {
        const entityName = (entity as any).name;
        const service = this.services[entityName] as BaseService<T>;
        if (!service) {
            throw new Error(`No service found for entity ${entityName}`);
        }

        const controller = new BaseController<T>(service);

        // Apply overrides
        Object.assign(controller, overrides);

        return controller;
    }
}
