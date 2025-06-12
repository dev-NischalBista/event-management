import Ticket, { ITicket } from "../models/ticket.model";
class TicketService {
  constructor() {}

  async getTickets() {
    const tickets = await Ticket.find().sort({ createdAt: -1 }).exec();

    return tickets;
  }

  async getTicket(userId: string, eventId: string) {
    const ticket = await Ticket.find({ userId, eventId });

    return ticket;
  }

  async bookTicket(data: ITicket) {
    return await Ticket.create(data);
  }
}

export const ticketService = new TicketService();
