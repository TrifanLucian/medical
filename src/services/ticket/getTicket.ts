import { getRepository } from 'typeorm';
import { Ticket } from '../../models/Ticket';
import { interpretDatabaseError } from '../../utils/interpretDatabaseError';

export const getTicket = async (id: string) => {
  const ticketRepository = getRepository(Ticket);
  try {
    const ticket = await ticketRepository.findOne(id, {
      relations: [],
    });
    if (!ticket) {
      return { success: false, data: null, error: 'Ticket not found' };
    }
    return { success: true, data: ticket, error: null };
  } catch (error) {
    const interpretedError = interpretDatabaseError(error);
    return { success: false, data: null, error: interpretedError };
  }
};
