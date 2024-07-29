import express from 'express';
import {
  createTicket_handler,
} from '../../controllers/ticket';

export const publicTicketRouter = express.Router();

publicTicketRouter.post('/tickets', createTicket_handler);
