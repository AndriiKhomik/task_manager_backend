import mongoose, { Document, Schema } from "mongoose";

interface BoardDoc extends Document {
  title: string;
}

const BoardSchema = new Schema(
  {
    title: { type: String, required: true },
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

const Board = mongoose.model<BoardDoc>("board", BoardSchema);

export { Board };
