import { Ocurrences } from "../entity/ocurrences";
import { OcurrencesDTO } from "../interfaces.Dto/ocurrence-profile";

export class OcurrencesRepository {
    constructor(private model: typeof Ocurrences) {}
  
    async createOcurrence(newOcurrence: OcurrencesDTO) {
      return await this.model.create(newOcurrence)
    };

    async findByOcurrence(id: string) {
      return this.model.findById( id )
    };

    async updatedOcurrence(id: string, payload: OcurrencesDTO) {
      return this.model.findByIdAndUpdate(id, payload, {new: true})
    };

    async findAllOcurrences(filter = {}) {
      return await this.model.find(filter)
    };
}