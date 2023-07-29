import { Request, Response } from "express";
import * as yup from "yup"

export class PatientController {
  constructor(private service: any) {}

    async createPatient(req: Request | any, res: Response) {
      const { body, params: {id}} = req

      const payload = {
        ...body,
        userId: id
      }
  
      const bodySchema = yup.object().shape({
        name: yup.string().required(),
        contact: yup.string().required(),
        birthdate: yup.date().required(),
        demands: yup.date(),
        personalAnnotations: yup.date(),
      })
      
      try {
        await bodySchema.validate(payload)

      } catch(err: any) {
        return res.status(400).json({ error: err.errors })

      } 
      const result = await this.service.create(payload)

      if ('error' in result) {

        return res.status(result.status).json(result)
      }
      return res.status(201).json(result)
    }

    async updatePatient(req: Request, res: Response) {
    const { body, params: { id } } = req

    const payload = body
  
    const updateSchema = yup.object().shape({
      name: yup.string(),
      contact: yup.string(),
      birthdate: yup.date(),
      demands: yup.date(),
      personalAnnotations: yup.date(),
    })
  
    try {
      await updateSchema.validate(payload)
      const patientUpdated = await  this.service.update(id, payload)
      return res.status(200).json(patientUpdated)
    } catch(err: any) {
      return res.status(400).json({ error: err.errors })
    }  
    }

    async findByPatient(req: Request, res: Response) {

      const { params: { id } } = req

      const result = await this.service.findByPatient(id) as any

      if ('error' in result) {
        return res.status(result.status).json(result)
      }

      return res.status(201).json(result)
    }

    async findAllPatients(req: Request, res: Response) {
      const {query} = req;

      const result = await this.service.findAllPatients(query);

      const { status, message, data, currentPage, totalPages } = result;

      res.status(status).json({ message, data, currentPage, totalPages });
    } 
}