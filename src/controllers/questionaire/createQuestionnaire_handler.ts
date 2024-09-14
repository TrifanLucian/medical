import { Request, Response } from 'express';
import {
  createQuestionaire,
} from '../../services/questionaire';

export const createQuestionnaire_handler = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await createQuestionaire(data);
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
