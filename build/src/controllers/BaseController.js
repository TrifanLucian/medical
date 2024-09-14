"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const class_validator_1 = require("class-validator");
class BaseController {
    constructor(service) {
        this.service = service;
    }
    async create(req, res) {
        try {
            const entity = this.service.create(req.body);
            await (0, class_validator_1.validateOrReject)(entity);
            const result = await this.service.create(req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (error) {
            res.status(400).json({ success: false, error });
        }
    }
    async read(req, res) {
        try {
            const id = req.params.id;
            const result = await this.service.read(id);
            if (!result) {
                res.status(404).json({ success: false, message: 'Entity not found' });
            }
            else {
                res.status(200).json({ success: true, data: result });
            }
        }
        catch (error) {
            res.status(400).json({ success: false, error });
        }
    }
    async update(req, res) {
        try {
            const id = req.params.id;
            const result = await this.service.update(id, req.body);
            if (!result) {
                res.status(404).json({ success: false, message: 'Entity not found' });
            }
            else {
                res.status(200).json({ success: true, data: result });
            }
        }
        catch (error) {
            res.status(400).json({ success: false, error });
        }
    }
    async delete(req, res) {
        try {
            const id = req.params.id;
            const result = await this.service.delete(id);
            if (!result) {
                res.status(404).json({ success: false, message: 'Entity not found' });
            }
            else {
                res.status(200).json({ success: true, message: 'Entity deleted' });
            }
        }
        catch (error) {
            res.status(400).json({ success: false, error });
        }
    }
    async list(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const result = await this.service.list(Number(page), Number(limit));
            res.status(200).json({ success: true, ...result });
        }
        catch (error) {
            res.status(400).json({ success: false, error });
        }
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map