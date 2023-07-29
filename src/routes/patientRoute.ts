import { Router } from "express";
import { PatientModule } from "../patient/patientModule";

export const patientRouter = Router()

const controller = PatientModule.build().controller

patientRouter.post('/patientCreate/userId/:id/users', controller.createPatient.bind(controller))

patientRouter.put('/patientUpdated/:id', controller.updatePatient.bind(controller))

patientRouter.get('/', controller.findAllPatients.bind(controller))

patientRouter.get('/patientFindByPatient/:id', controller.findByPatient.bind(controller))