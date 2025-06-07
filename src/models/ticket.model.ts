import { ObjectId, Schema, model } from "mongoose";

interface ITicket {
  eventId: ObjectId;
  userId: ObjectId;
  type: "standard" | "premium" | "vip";
  price: number;
  seatNo?: string;
  isValid: boolean;
}

const ticketSchema = new Schema<ITicket>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["standard", "premium", "vip"],
      default: "standard",
    },
    price: {
      type: Number,
      required: true,
    },
    seatNo: {
      type: String,
      required: false,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = model("Ticket", ticketSchema);

export default Ticket;
