import { Schema, model, Document, Model } from 'mongoose';
import { User } from './userModel';

// Define the interface for the Post document
interface Blog extends Document {
  title: string;
  summary: string;
  content: string;
  cover: string;
  author: Schema.Types.ObjectId;
}

// Define the schema
const BlogSchema = new Schema<Blog>(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    cover: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

// Create the model
const BlogModel: Model<Blog> = model<Blog>('Blog', BlogSchema);

export default BlogModel;
