import { ActiveSession } from '../../models/ActiveSession';
import { connection } from '../../server/database';

export const logout = (req: any, res: any) => {
  const { token } = req.body;
  const activeSessionRepository = connection!.getRepository(ActiveSession);

  activeSessionRepository.delete({ token })
    .then(() => res.json({ success: true }))
    .catch(() => {
      res.json({ success: false, msg: 'Token revoked' });
    });
};
