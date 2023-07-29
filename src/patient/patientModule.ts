import { User } from "../user/entity/user";
import { UserRepository } from "../user/repository/userRepository";
import { PatientController } from "./controller/patientController";
import { Patients } from "./entity/patient";
import { PatientRepository } from "./repository/patientRepository";
import { PatientService } from "./service/patientService";

export class PatientModule {
  static build() {
    const repository = new PatientRepository(Patients)
    const service = new PatientService(repository, new UserRepository(User));
    const controller = new PatientController(service)

    return { repository, service, controller }
  }
}