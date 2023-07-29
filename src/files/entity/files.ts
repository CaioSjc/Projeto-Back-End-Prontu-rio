import mongoose from "mongoose";
import { FilesProfileDTO } from "../interfaces.Dto/files-profile";

const FilesSchema = new mongoose.Schema({
  filename: {type: String, required: false},
  mimetype: {type: String, required: false}
}, { timestamps: true })

export const Files = mongoose.model<FilesProfileDTO>("Files", FilesSchema)