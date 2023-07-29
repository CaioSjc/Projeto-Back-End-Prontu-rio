import { Ocurrences } from "../ocurrences/entity/ocurrences";
import { OcurrencesRepository } from "../ocurrences/repository/ocurrencesRepositorie";
import { Patients } from "../patient/entity/patient";
import { PatientRepository } from "../patient/repository/patientRepository";
import { TimelinesController } from "./controller/timeLineController";
import { TimeLines } from "./entity/timelines";
import { TimelinesRepository } from "./repository/timelinesRepository";
import { TimelinesService } from "./service/timelinesService";

export class TimelinesModule {
  static build() {
    const repository = new TimelinesRepository(TimeLines)
    const service = new TimelinesService(repository, new PatientRepository(Patients))
    const controller = new TimelinesController(service)
    return { repository, service, controller }
  }
}