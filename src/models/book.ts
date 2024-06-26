import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  bookName: string;
  authorName: string;
  bookPrice: number;
  bookType: string;
  noOfPages: number;
}

const BookSchema: Schema = new Schema({
  bookName: { type: String, required: true, unique: true },
  authorName: { type: String, required: true },
  bookPrice: { type: Number, required: true },
  bookType: { type: String, required: true },
  noOfPages: { type: Number, required: true },
});

export default mongoose.model<IBook>("Book", BookSchema);
