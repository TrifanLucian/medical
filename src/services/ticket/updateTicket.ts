import { getRepository } from 'typeorm';
import { Ticket } from '../../models/Ticket';
import { interpretDatabaseError } from '../../utils/interpretDatabaseError';

export const updateTicket = async (id: string, data: Partial<Ticket>) => {
  const ticketRepository = getRepository(Ticket);
  try {
    const ticket = await ticketRepository.findOne(id);
    if (!ticket) {
      return { success: false, data: null, error: 'Ticket not found' };
    }

    ticketRepository.merge(ticket, data);
    const updatedTicket = await ticketRepository.save(ticket);
    return { success: true, data: updatedTicket, error: null };
  } catch (error) {
    const interpretedError = interpretDatabaseError(error);
    return { success: false, data: null, error: interpretedError };
  }
};
