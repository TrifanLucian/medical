import { Request, Response } from 'express';
import {
  updateTicket,
} from '../../services/ticket';

export const updateTicket_handler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const result = await updateTicket(id, updateData);
    if (!result.success) {
      return res.status(404).json(result);
    }
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
