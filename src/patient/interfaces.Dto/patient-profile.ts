export interface PatientProfileDTO extends Document {
  name: string;
  contact: string; 
  birthdate: Date;
  demands: string;
  personalAnnotations: string;
  userId: string;
  timelineId: string[];
}