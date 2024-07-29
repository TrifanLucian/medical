import { NextFunction, Request, Response } from 'express';

import { ActiveSession } from '../models/ActiveSession';
import { connection } from '../server/database';

// eslint-disable-next-line import/prefer-default-export
export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = String(req.headers.authorization || req.body.token);
  const activeSessionRepository = connection!.getRepository(ActiveSession);
  activeSessionRepository.findOne({ token }, {
    relations: ['user'],
  }).then((session) => {
    (req as any).sessionData = session;
    if (session?.token) {
      return next();
    }
    return res.json({ success: false, msg: 'User is not logged on' });
  });
};
