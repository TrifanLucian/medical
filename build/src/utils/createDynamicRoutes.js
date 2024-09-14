"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDynamicRoutes = void 0;
const ControllerFactory_1 = require("../controllers/ControllerFactory");
const RouteFactory_1 = require("../routes/RouteFactory");
function createDynamicRoutes(entities, services, overrides = {}, validationRules = {}) {
    const controllerFactory = new ControllerFactory_1.ControllerFactory(services);
    const routesConfig = entities.map(entity => {
        const entityName = entity.name;
        const controller = controllerFactory.createController(entity, overrides[entityName] || {});
        return {
            path: `/${entityName.toLowerCase()}`,
            controller,
            validationRules: validationRules[entityName] || {}
        };
    });
    return RouteFactory_1.RouteFactory.createRoutes(routesConfig);
}
exports.createDynamicRoutes = createDynamicRoutes;
//# sourceMappingURL=createDynamicRoutes.js.map