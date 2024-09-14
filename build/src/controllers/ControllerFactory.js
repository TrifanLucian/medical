"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerFactory = void 0;
const BaseController_1 = require("./BaseController");
class ControllerFactory {
    constructor(services) {
        this.services = services;
    }
    createController(entity, overrides = {}) {
        const entityName = entity.name;
        const service = this.services[entityName];
        if (!service) {
            throw new Error(`No service found for entity ${entityName}`);
        }
        const controller = new BaseController_1.BaseController(service);
        // Apply overrides
        Object.assign(controller, overrides);
        return controller;
    }
}
exports.ControllerFactory = ControllerFactory;
//# sourceMappingURL=ControllerFactory.js.map