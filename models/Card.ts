import mongoose, { Document, Schema } from "mongoose";

const StatusValues = ["TODO", "IN_PROGRESS", "DONE"] as const;

interface CardDoc extends Document {
  title: string;
  description: string;
  status: (typeof StatusValues)[number];
  boardId: string;
}

const CardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: StatusValues, required: true },
    boardId: { type: Schema.Types.ObjectId, ref: "board", required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const Card = mongoose.model<CardDoc>("card", CardSchema);

export { Card };
