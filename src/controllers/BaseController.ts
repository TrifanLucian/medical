import { Request, Response } from 'express';
import { BaseService } from '../services/BaseService';
import { validateOrReject } from 'class-validator';
import { ObjectLiteral } from 'typeorm';

export class BaseController<T extends ObjectLiteral> {
    protected service: BaseService<T>;

    constructor(service: BaseService<T>) {
        this.service = service;
    }

    async create(req: Request, res: Response) {
        try {
            const entity = this.service.create(req.body);
            await validateOrReject(entity as any);
            const result = await this.service.create(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }

    async read(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const result = await this.service.read(id);
            if (!result) {
                res.status(404).json({ success: false, message: 'Entity not found' });
            } else {
                res.status(200).json({ success: true, data: result });
            }
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const result = await this.service.update(id, req.body);
            if (!result) {
                res.status(404).json({ success: false, message: 'Entity not found' });
            } else {
                res.status(200).json({ success: true, data: result });
            }
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const result = await this.service.delete(id);
            if (!result) {
                res.status(404).json({ success: false, message: 'Entity not found' });
            } else {
                res.status(200).json({ success: true, message: 'Entity deleted' });
            }
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const result = await this.service.list(Number(page), Number(limit));
            res.status(200).json({ success: true, ...result });
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }
}
