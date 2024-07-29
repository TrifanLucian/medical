import { Router } from 'express';
import { BaseController } from '../controllers/BaseController';

export type RouteConfig = {
    path: string;
    controller: BaseController<any>;
    validationRules?: {
        create?: any[];
        read?: any[];
        update?: any[];
        delete?: any[];
        list?: any[];
    };
};

export class RouteFactory {
    static createRoutes(config: RouteConfig[]): Router {
        const router = Router();

        config.forEach(({ path, controller, validationRules }) => {
            if (validationRules?.create) {
                router.post(path, ...validationRules.create, (req, res) => controller.create(req, res));
            } else {
                router.post(path, (req, res) => controller.create(req, res));
            }

            if (validationRules?.read) {
                router.get(`${path}/:id`, ...validationRules.read, (req, res) => controller.read(req, res));
            } else {
                router.get(`${path}/:id`, (req, res) => controller.read(req, res));
            }

            if (validationRules?.update) {
                router.put(`${path}/:id`, ...validationRules.update, (req, res) => controller.update(req, res));
            } else {
                router.put(`${path}/:id`, (req, res) => controller.update(req, res));
            }

            if (validationRules?.delete) {
                router.delete(`${path}/:id`, ...validationRules.delete, (req, res) => controller.delete(req, res));
            } else {
                router.delete(`${path}/:id`, (req, res) => controller.delete(req, res));
            }

            if (validationRules?.list) {
                router.get(path, ...validationRules.list, (req, res) => controller.list(req, res));
            } else {
                router.get(path, (req, res) => controller.list(req, res));
            }
        });

        return router;
    }
}
