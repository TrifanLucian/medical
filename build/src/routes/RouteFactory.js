"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteFactory = void 0;
const express_1 = require("express");
class RouteFactory {
    static createRoutes(config) {
        const router = (0, express_1.Router)();
        config.forEach(({ path, controller, validationRules }) => {
            if (validationRules === null || validationRules === void 0 ? void 0 : validationRules.create) {
                router.post(path, ...validationRules.create, (req, res) => controller.create(req, res));
            }
            else {
                router.post(path, (req, res) => controller.create(req, res));
            }
            if (validationRules === null || validationRules === void 0 ? void 0 : validationRules.read) {
                router.get(`${path}/:id`, ...validationRules.read, (req, res) => controller.read(req, res));
            }
            else {
                router.get(`${path}/:id`, (req, res) => controller.read(req, res));
            }
            if (validationRules === null || validationRules === void 0 ? void 0 : validationRules.update) {
                router.put(`${path}/:id`, ...validationRules.update, (req, res) => controller.update(req, res));
            }
            else {
                router.put(`${path}/:id`, (req, res) => controller.update(req, res));
            }
            if (validationRules === null || validationRules === void 0 ? void 0 : validationRules.delete) {
                router.delete(`${path}/:id`, ...validationRules.delete, (req, res) => controller.delete(req, res));
            }
            else {
                router.delete(`${path}/:id`, (req, res) => controller.delete(req, res));
            }
            if (validationRules === null || validationRules === void 0 ? void 0 : validationRules.list) {
                router.get(path, ...validationRules.list, (req, res) => controller.list(req, res));
            }
            else {
                router.get(path, (req, res) => controller.list(req, res));
            }
        });
        return router;
    }
}
exports.RouteFactory = RouteFactory;
//# sourceMappingURL=RouteFactory.js.map