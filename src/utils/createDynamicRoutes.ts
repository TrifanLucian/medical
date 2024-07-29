import { EntityTarget, ObjectLiteral } from 'typeorm';
import { Router } from 'express';
import { ControllerFactory } from '../controllers/ControllerFactory';
import { RouteFactory, RouteConfig } from '../routes/RouteFactory';
import { BaseService } from '../services/BaseService';
import { BaseController } from '../controllers/BaseController';

export function createDynamicRoutes(
    entities: EntityTarget<ObjectLiteral>[],
    services: { [key: string]: BaseService<ObjectLiteral> },
    overrides: { [key: string]: Partial<BaseController<ObjectLiteral>> } = {},
    validationRules: { [key: string]: RouteConfig['validationRules'] } = {}
): Router {
    const controllerFactory = new ControllerFactory(services);
    const routesConfig: RouteConfig[] = entities.map(entity => {
        const entityName = (entity as any).name;
        const controller = controllerFactory.createController(entity, overrides[entityName] || {});
        return {
            path: `/${entityName.toLowerCase()}`,
            controller,
            validationRules: validationRules[entityName] || {}
        };
    });

    return RouteFactory.createRoutes(routesConfig);
}
