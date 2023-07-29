import { TimelinesRepository } from "../../timelines/repository/timelinesRepository";
import { OcurrencesDTO } from "../interfaces.Dto/ocurrence-profile";
import { OcurrencesRepository } from "../repository/ocurrencesRepositorie";

export class OcurrencesService {
    constructor(
      private repository: OcurrencesRepository,
      private timelineRepository: TimelinesRepository
      ) {}
  
  async createOcurrence(payload: OcurrencesDTO) {    
       
    try {   
      const { ocurrenceId } = payload;
      const ocurrenceCreated = await this.repository.createOcurrence(payload);           
            
  
      const timelineFound = await this.timelineRepository.findById(ocurrenceId)
      timelineFound?.ocurrenceId.push(ocurrenceCreated._id as any)      
      timelineFound?.save()      
       
      return { status: 201,  message: "Successfully created Ocurrence", data: ocurrenceCreated };
 
    } catch(error: any) {
        return { error: true, status: 500, message: "Internal server error", data: null }     
    }
  }

  async findByOcurrence(timelineId: string) {
    try {
      return this.repository.findByOcurrence(timelineId)

    } catch (error: any) {
      return { error: true, status: 500, message: "Internal server error" }
    }
  }
  
  async updatedOcurrence(id: string, payload: OcurrencesDTO) {

    try {
      return this.repository.updatedOcurrence(id, payload)

    } catch(error: any) {
      return { error: true, status: 500, message: "Internal server error" }
    }
  }
  
  async findAllOcurrences(ocurrences: string)  {

    try {
      const ocurrecesFound = await this.repository.findAllOcurrences( ocurrences );
      return { status: 200,  message: "Successfully ocurrences found", data: ocurrecesFound };

    } catch (error: any) {
      return { error: true, status: 500, message: "Internal server error" }
    }
  }
}