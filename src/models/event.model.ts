import mongoose, { Schema, model, Document } from "mongoose";

interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  registrationStart: Date;
  registrationEnd: Date;
  location: string;
  organizer: Object;
  attendees: string[];
  capacity: number;
  pricing: Record<"standard" | "premium" | "vip", number>;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    registrationStart: { type: Date, required: true },
    registrationEnd: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    capacity: { type: Number, require: true },
    pricing: {
      type: {
        standard: { type: Number },
        premium: { type: Number },
        vip: { type: Number },
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);
export default Event;
