import pkg from "mongoose";
const { Schema, model } = pkg;

const PhotoSchema = new Schema(
  {
    imageURL: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Photo = model("photo", PhotoSchema);
