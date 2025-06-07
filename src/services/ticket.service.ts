import Ticket from "../models/ticket.model";

const createTicket = () => {};

const getAllTickets = async () => {
  return await Ticket.find()
    // .populate("userId")
    // .populate("eventId")
    .sort({ createdAt: -1 })
    .exec();
};

export const ticketService = {
  getAllTickets,
};
