// models/User.js
import mongoose from "mongoose";
mongoose.set('strictQuery', true)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model('User', userSchema);
