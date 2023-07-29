import mongoose from "mongoose";
import { OcurrencesDTO } from "../interfaces.Dto/ocurrence-profile";

const OcurrencesSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 4},
  content: {type: String, required: true, minlength: 4},
  kind: {type: String, required: true},
  files: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Files'}],
  timelineId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Timelines'}
}, { timestamps: true })

export const Ocurrences = mongoose.model<OcurrencesDTO>("Ocurrences", OcurrencesSchema)