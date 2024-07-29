import { Request, Response } from 'express';
import {
  updateSettings,
} from '../../services/setting';

export const updateSettings_handler = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await updateSettings(data);
    if (!result.success) {
      return res.status(404).json(result);
    }
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
