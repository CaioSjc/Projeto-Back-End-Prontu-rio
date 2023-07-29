import { Patients } from "../entity/patient";
import { PatientProfileDTO } from "../interfaces.Dto/patient-profile";

export class PatientRepository {
  constructor(private model: typeof Patients) {}

  async createPatient(newPatient: PatientProfileDTO) {
    return this.model.create(newPatient)
  };

  async updatePatient(id: string, payload: PatientProfileDTO) {
    return this.model.findByIdAndUpdate(id, payload, {new: true})
  };

  async findByPatient(id: string) {
    return this.model.findById( id )
  };

  async findAllPatients(filter = {}) {
    return await this.model.find(filter)
  };

  async findById(id: string) {
    return this.model.findById(id)
  };
}
