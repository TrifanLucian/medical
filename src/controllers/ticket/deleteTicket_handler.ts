import { Request, Response } from 'express';
import {
  deleteTicket,
} from '../../services/ticket';

export const deleteTicket_handler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteTicket(id);
    if (!result.success) {
      return res.status(404).json(result);
    }
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
