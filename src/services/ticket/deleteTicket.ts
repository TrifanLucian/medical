import { getRepository } from 'typeorm';
import { Ticket } from '../../models/Ticket';
import { interpretDatabaseError } from '../../utils/interpretDatabaseError';

export const deleteTicket = async (id: string) => {
  const ticketRepository = getRepository(Ticket);
  try {
    const deleteResult = await ticketRepository.delete(id);
    if (deleteResult.affected === 0) {
      return { success: false, data: null, error: 'Ticket not found' };
    }
    return { success: true, data: { id }, error: null };
  } catch (error) {
    const interpretedError = interpretDatabaseError(error);
    return { success: false, data: null, error: interpretedError };
  }
};
