import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cardHistorySchema = new Schema(
  {
    card: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      required: true,
    },
    action: {
      type: String,
      enum: ["CREATE", "UPDATE", "DELETE"],
      required: true,
    },
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    snapshot: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("CardHistory", cardHistorySchema);
