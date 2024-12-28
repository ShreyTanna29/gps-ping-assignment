import mongoose, { Schema } from "mongoose";

const PingSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    cordinates: [
      {
        lat: {
          type: Number,
          required: true,
        },
        long: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const ping = mongoose.model("Ping", PingSchema);
