import Ticket, { ITicket } from "../models/ticket.model";
class TicketService {
  constructor() {}

  async getTickets() {
    const tickets = await Ticket.find().sort({ createdAt: -1 }).exec();

    return tickets;
  }

  async getEventTickets(eventId: string) {
    const tickets = await Ticket.find({ eventId })
      .sort({ createdAt: -1 })
      .exec();

    return tickets;
  }

  async getUserTickets(userId: string) {
    const tickets = await Ticket.find({ userId })
      .sort({ createdAt: -1 })
      .exec();

    return tickets;
  }

  async getTicket(userId: string, eventId: string) {
    const ticket = await Ticket.findOne({ userId, eventId });

    return ticket;
  }

  async bookTicket(data: ITicket) {
    return await Ticket.create(data);
  }
}

export const ticketService = new TicketService();
