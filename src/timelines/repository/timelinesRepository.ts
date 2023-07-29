import { TimeLines } from "../entity/timelines";
import { TimelinesPatientDTO } from "../interfaces.Dto/timelines-patient.Dto";

export class TimelinesRepository {
    constructor(private model: typeof TimeLines) {}
  
    async createTimeline(newtimeline: TimelinesPatientDTO) {
      return this.model.create(newtimeline)
    };

    async updateTimeline(id: string, payload: TimelinesPatientDTO) {
      return this.model.findByIdAndUpdate(id, payload, {new: true})
    };

    async findByTimeline(id: string) {
      return (await this.model.findById( id )).populate('ocurrenceId')
    };

    async findAllTimelines(filter = {}) {
      return await this.model.find(filter)
      
    };

    async findById(id: string) {
      return this.model.findById(id)
    };  
}