import { Request, Response } from 'express';
import {
  getQuestionaire,
} from '../../services/questionaire';

export const getQuestionaire_handler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await getQuestionaire(id);
  if (!response.success) {
    return res.status(404).json(response);
  }
  return res.json(response);
};
