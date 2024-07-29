import express from 'express';
import {
    getAllSettings_handler,
    updateSettings_handler,
} from '../../../controllers/setting';

export const settingRouter = express.Router();

settingRouter.get('/settings', getAllSettings_handler);
settingRouter.put('/settings', updateSettings_handler);
