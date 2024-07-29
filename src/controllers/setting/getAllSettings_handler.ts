import { Request, Response } from 'express';
import { getAllSettings } from '../../services/setting';

export const getAllSettings_handler = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const scope = req.query.scope as 'public' | 'secret' | 'dev' | undefined;

    const paginatedResult = await getAllSettings(page, limit, scope);
    return res.json(paginatedResult);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
