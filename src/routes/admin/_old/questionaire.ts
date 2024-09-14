import express from 'express';
import {
  // deleteTicket_handler,
  // getAllTickets_handler,
  getQuestionaire_handler,
  createQuestionnaire_handler,
  // updateTicket_handler,
} from '../../../controllers/questionaire';

export const questionaireRouter = express.Router();

// ticketRouter.post('/tickets', createTicket_handler);
// ticketRouter.get('/tickets', getAllTickets_handler);
questionaireRouter.get('/questionaires/:id', getQuestionaire_handler);
questionaireRouter.post('/questionaires', createQuestionnaire_handler);
// ticketRouter.delete('/tickets/:id', deleteTicket_handler);
