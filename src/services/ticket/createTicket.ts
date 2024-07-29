import { getRepository } from 'typeorm';
import { Ticket } from '../../models/Ticket';
import { interpretDatabaseError } from '../../utils/interpretDatabaseError';

export const createTicket = async (data: Partial<Ticket> & { phone: string; email?: string; name?: string }) => {
  const ticketRepository = getRepository(Ticket);

  try {

    if (!data.name) {
      throw new Error("Please tell us your name");
    }

    if (!data.phone) {
      throw new Error("Phone number is mandatory");
    }

    if (!data.message) {
      throw new Error("Message is mandatory");
    }

    // Try to find a customer by phone number or email
    const query: Record<any, any>[] = [
      { phone_number: data.phone },
    ];
    if(data.email) {
      query.push({ email: data.email });
    }

    // Create new ticket and attach customer
    const newTicket = ticketRepository.create({
      message: data.message,
      booking_code: data.booking_code,
    });
    await ticketRepository.save(newTicket);
    return { success: true, data: newTicket, error: null };
  } catch (error: any) {
    const interpretedError = interpretDatabaseError(error);
    return { success: false, data: null, error: interpretedError };
  }
};