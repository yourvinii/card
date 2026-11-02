import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isDeleted: {
      type: Boolena,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Card", cardSchema);
