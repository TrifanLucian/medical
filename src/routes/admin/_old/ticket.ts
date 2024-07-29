import express from 'express';
import {
  createTicket_handler,
  deleteTicket_handler,
  getAllTickets_handler,
  getTicket_handler,
  updateTicket_handler,
} from '../../../controllers/ticket';

export const ticketRouter = express.Router();

ticketRouter.post('/tickets', createTicket_handler);
ticketRouter.get('/tickets', getAllTickets_handler);
ticketRouter.get('/tickets/:id', getTicket_handler);
ticketRouter.put('/tickets/:id', updateTicket_handler);
ticketRouter.delete('/tickets/:id', deleteTicket_handler);
