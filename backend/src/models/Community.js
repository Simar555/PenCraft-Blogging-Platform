import { Schema, model } from 'mongoose';

const CommunitySchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
  category: { type: String },
  image: { type: String, default: '' },
  isPrivate: { type: Boolean, default: false },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default model('Community', CommunitySchema);
