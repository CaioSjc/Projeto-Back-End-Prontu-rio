import { PatientRepository } from "../../patient/repository/patientRepository";
import { TimelinesPatientDTO } from "../interfaces.Dto/timelines-patient.Dto";
import { TimelinesRepository } from "../repository/timelinesRepository";

export class TimelinesService {
    constructor(
      private repository: TimelinesRepository,
      private  patientRepository: PatientRepository
      ) {}
  
    async create(payload: TimelinesPatientDTO) {    
       
      try {   
        const { patientId } = payload;  
        const timelineCreated = await this.repository.createTimeline(payload)       
        const patientFound = await this.patientRepository.findById(patientId);
       
        patientFound?.timelineId.push(timelineCreated._id as any)
        patientFound?.save();      
       
        return { status: 201,  message: "Successfully created timeline", data: timelineCreated };
 
     } catch(error: any) {
       return { error: true, status: 500, message: "Internal server error", data: null }     
     }
    }

    async findByTimeline(timelinesId: string) {
      try {
        return this.repository.findByTimeline(timelinesId)

      } catch (error: any) {
        return { error: true, status: 500, message: "Internal server error" }
    }
    } 

    async updateTimeline(id: string, payload: TimelinesPatientDTO) {

      try {
        return this.repository.updateTimeline(id, payload)

      } catch(error: any) {
        return { error: true, status: 500, message: "Internal server error" }
    }
    }
  
    async findAllTimelines(timelines: string)  {

    try {
      const timelinesFound = await this.repository.findAllTimelines( timelines );
      
      return { status: 200,  message: "Successfully timelines found", data: timelinesFound };

    } catch (error: any) {
      return { error: true, status: 500, message: "Internal server error" }
    }
    }
}