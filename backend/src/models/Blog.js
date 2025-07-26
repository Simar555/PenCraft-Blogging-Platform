import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const BlogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // rich text in HTML
  category: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [CommentSchema],
}, { timestamps: true });

// Create text index for search on title and content
BlogSchema.index({ title: 'text', content: 'text' });

export default model('Blog', BlogSchema);
