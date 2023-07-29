export interface TimelinesPatientDTO extends Document {
  name: string;
  patientId: string;
  ocurrenceId: string[]; 
}