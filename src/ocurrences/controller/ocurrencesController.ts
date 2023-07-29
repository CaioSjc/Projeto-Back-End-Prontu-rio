import { Request, Response } from "express";
import * as yup from "yup"

export class OcurrencesController {
  constructor(private service: any) {}

    async createOcurrence(req: Request | any, res: Response) {
      const { body, params: { id } } = req

      const payload = {
        ...body,
        ocurrenceId: id
      }
  
      const bodySchema = yup.object().shape({      
        name: yup.string().required(),
        content: yup.string().required(),
        kind: yup.string().required()
      })
      
      try {
        await bodySchema.validate(payload)

      } catch(err: any) {
        return res.status(400).json({ error: err.errors })

      } 
      const result = await this.service.createOcurrence(payload)

      if (result?.error) {
        return res.status(result.status).json(result)
      }
        return res.status(201).json(result)
    }

    async findByOcurrence(req: Request, res: Response) {

      const { params: { id } } = req

      const result = await this.service.findByOcurrence(id) as any

      if (result?.error) {
        return res.status(result.status).json(result)
      }

      return res.status(201).json(result)
    }

    async updatedOcurrence(req: Request, res: Response) {
      const { body, params: { id } } = req
  
      const payload = body
    
      const updateSchema = yup.object().shape({
        name: yup.string(),
        content: yup.string(),
        kind: yup.string(),
      })
    
    try {
      await updateSchema.validate(payload)

      const ocurrenceUpdated = await this.service.updatedOcurrence(id, payload)
      
      return res.status(200).json(ocurrenceUpdated)

    } catch(err: any) {
      return res.status(400).json({ error: err.errors })
    }  
    }

    async findAllOcurrences(req: Request, res: Response) {
    
      const ocurrenceId  = req.query.id; 
    
      try{
        const result = await this.service.findAllOcurrences(ocurrenceId);

        return res.status(200).json(result)

    } catch (err: any){
        return res.status(400).json({ error: err.errors })
    }   
    } 
}