import { Request, Response } from 'express';
import {
  getTicket,
} from '../../services/ticket';

export const getTicket_handler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await getTicket(id);
  if (!response.success) {
    return res.status(404).json(response);
  }
  return res.json(response);
};
