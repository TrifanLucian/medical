import { Service } from 'typedi';
import { BaseService } from './BaseService';
import { ServiceFactory } from './ServiceFactory';
import { Ticket } from '../models/Ticket';

@Service()
export class TicketService extends BaseService<Ticket> {
    constructor(factory: ServiceFactory) {
        super(Ticket, factory.createService(Ticket).getRelations(), factory.createService(Ticket).getQueryRelations());
        factory.setRelations(Ticket, []);
        factory.setRelations(Ticket, [], 'deep');
    }
}
