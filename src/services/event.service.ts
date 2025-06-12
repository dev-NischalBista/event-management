import Event from "../models/event.model";

class EventService {
  constructor() {}

  async getEvents() {
    return await Event.find().sort({ createdAt: -1 }).exec();
  }

  async getEventById(eventId: string) {
    return await Event.findById(eventId).exec();
  }

  async getEventByTitle(title: string) {
    return await Event.findOne({ title }).exec();
  }

  async addEvent(data: Event) {
    return await Event.create(data);
  }
}

export const eventService = new EventService();
