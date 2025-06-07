import Event from "../models/event.model";

const fetchAllEvents = async () => {
  return await Event.find().sort({ createdAt: -1 }).exec();
};

const findEventById = async (eventId: string) => {
  return await Event.findById(eventId).exec();
};

const findEventByTitle = async (title: string) => {
  return await Event.findOne({ title }).exec();
};

const createEvent = async (eventData: Event) => {
  const newEvent = new Event(eventData);
  return await newEvent.save();
};

export const eventService = {
  fetchAllEvents,
  findEventById,
  findEventByTitle,
  createEvent,
};
