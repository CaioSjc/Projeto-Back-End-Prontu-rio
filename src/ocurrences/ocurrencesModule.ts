import { TimeLines } from "../timelines/entity/timelines";
import { TimelinesRepository } from "../timelines/repository/timelinesRepository";
import { Ocurrences } from "./entity/ocurrences";
import { OcurrencesRepository } from "./repository/ocurrencesRepositorie";
import { OcurrencesService } from "./service/ocurrencesService";
import { OcurrencesController } from "./controller/ocurrencesController";

export class OcurrencesModule {
  static build() {
    const repository = new OcurrencesRepository(Ocurrences)
    const service = new OcurrencesService(repository, new TimelinesRepository(TimeLines))
    const controller = new OcurrencesController(service)
    return { repository, service, controller }
  }
}