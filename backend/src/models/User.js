import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  communities: [{ type: Schema.Types.ObjectId, ref: 'Community' }],
}, { timestamps: true });

// Hash password before save
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = function(plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

export default model('User', UserSchema);

