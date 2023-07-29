import { Router } from "express";
import { OcurrencesModule } from "../ocurrences/ocurrencesModule";

export const ocurrencesRouter = Router()

const controller = OcurrencesModule.build().controller

ocurrencesRouter.post('/ocurrenceCreate/timelineId/:id/timelines', controller.createOcurrence.bind(controller))

ocurrencesRouter.put('/ocurrenceUpdated/:id', controller.updatedOcurrence.bind(controller))

ocurrencesRouter.get('/', controller.findAllOcurrences.bind(controller))

ocurrencesRouter.get('/FindByOcurrence/:id', controller.findByOcurrence.bind(controller))