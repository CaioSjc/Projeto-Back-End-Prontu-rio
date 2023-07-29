import { Request, Response } from "express";
import * as yup from "yup"

export class TimelinesController {
  constructor(private service: any) {}

    async createTimeline(req: Request | any, res: Response) {
      const { body, params: { id } } = req

      const payload = {
        ...body,
        patientId: id
      }
  
      const bodySchema = yup.object().shape({      
        name: yup.string().required(),
      })
      
      try {
        await bodySchema.validate(payload)

      } catch(err: any) {
        return res.status(400).json({ error: err.errors })

      } 
      const result = await this.service.create(payload)

      if ( result?.error) {

        return res.status(result.status).json(result)
      }
      return res.status(201).json(result)
    }

    async findByTimeline(req: Request, res: Response) {

      const { params: { id } } = req

      const result = await this.service.findByTimeline(id) as any

      if (result?.error) {
        return res.status(result.status).json(result)
      }
      return res.status(200).json(result)
    }

    async updateTimeline(req: Request, res: Response) {
      const { body, params: { id } } = req
  
      const payload = body
    
      const updateSchema = yup.object().shape({
        name: yup.string(),
      })
    
    try {
      await updateSchema.validate(payload)
      
      const patientUpdated = await  this.service.updateTimeline(id, payload)

      return res.status(200).json(patientUpdated)

    } catch(err: any) {     
      return res.status(400).json({ error: err.errors })
    }  
    }

    async findAllTimelines(req: Request, res: Response) {
    
      const patientId = req.query;    
   
    try {     

      const result = await this.service.findAllTimelines(patientId)

      return res.status(200).json(result)

    } catch(err: any) {
      return res.status(400).json({ error: err.errors })
    }  
    }
}