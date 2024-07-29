import { Request, Response } from 'express';
import {
  getAllTickets,
} from '../../services/ticket';

export const getAllTickets_handler = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const paginatedResult = await getAllTickets(page, limit);
    return res.json(paginatedResult);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
