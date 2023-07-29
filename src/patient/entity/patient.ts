import mongoose from "mongoose";
import { PatientProfileDTO } from "../interfaces.Dto/patient-profile";

const PatientsSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 4},
  contact: {type: String, required: true, minlength: 11},
  birthdate: {type: Date, required: true, minlength: 8},
  demands: {type: String, required: false},
  personalAnnotations: {type: String, required: false},
  timelineId: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Timelines'}],
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
}, { timestamps: true })

export const Patients = mongoose.model<PatientProfileDTO>("Patients", PatientsSchema)