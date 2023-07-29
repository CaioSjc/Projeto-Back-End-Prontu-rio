import mongoose from "mongoose";
import { UserProfileDTO } from "../interfaces.Dto/user-profile";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 4 },
  nickname: { type: String, required: true, unique: true },
  email: { type: String, required: true, minlength: 8, unique: true },
  password: { type: String, required: true, minlength: 6 },
  photo: { type: String, required: false },
  patients: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Patients' }],
}, { timestamps: true })

export const User = mongoose.model<UserProfileDTO>("User", UserSchema)