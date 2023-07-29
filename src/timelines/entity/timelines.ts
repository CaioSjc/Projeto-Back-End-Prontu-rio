import mongoose from "mongoose";
import { TimelinesPatientDTO } from "../interfaces.Dto/timelines-patient.Dto";

const TimeLinesSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 4},
  patientId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Patients'},
  ocurrenceId: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Ocurrences'}],
}, { timestamps: true })

export const TimeLines = mongoose.model<TimelinesPatientDTO>("TimeLines", TimeLinesSchema)