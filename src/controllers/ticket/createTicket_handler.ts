import { Request, Response } from 'express';
import {
  createTicket,
} from '../../services/ticket';

export const createTicket_handler = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await createTicket(data);
    if (!result.success) {
      return res.status(404).json(result);
    }
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create ticket',
      errorType: 'InternalServerError',
      data: undefined,
    });
  }
};
