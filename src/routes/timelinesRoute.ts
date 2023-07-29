import { Router } from "express";
import { TimelinesModule } from "../timelines/timelinesModule";

export const timelinesRouter = Router()

const controller = TimelinesModule.build().controller

timelinesRouter.post('/timelineCreate/patientId/:id/patients', controller.createTimeline.bind(controller))

timelinesRouter.put('/timelineUpdated/:id', controller.updateTimeline.bind(controller))

timelinesRouter.get('/', controller.findAllTimelines.bind(controller))

timelinesRouter.get('/FindByTimeline/:id', controller.findByTimeline.bind(controller))

timelinesRouter.get('/FindByTimeline/:id/ocurrences', controller.findByTimeline.bind(controller))