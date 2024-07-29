import { getRepository } from 'typeorm';
import { Ticket } from '../../models/Ticket';
import { PaginatedResult, paginate } from '../../utils/pagination';

export const getAllTickets = async (
  page = 1,
  limit = 10,
): Promise<PaginatedResult<Ticket>> => {
  const ticketRepository = getRepository(Ticket);
  const options: any = {
    skip: (page - 1) * limit,
    take: limit,
    relations: [],
  };

  const [data, totalRecords] = await ticketRepository.findAndCount(options);

  return paginate<Ticket>(data, page, limit, totalRecords);
};
