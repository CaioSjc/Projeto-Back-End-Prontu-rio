import { Request, Response } from "express"
import * as yup from "yup"
import { UserService } from "../service/userService"

export class UserController {

  constructor(private service: UserService) {}

  async create(req: Request, res: Response) {
    const { body, file } = req

    const payload = body
  
    const bodySchema = yup.object().shape({
      name: yup.string().required(),
      nickname: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    
    try {
      await bodySchema.validate(payload)

    } catch(err: any) {
      return res.status(400).json({ error: err.errors })
    }

    const result = await this.service.create({...body, 
      photo: file?.filename, mimetype: file?.mimetype })
    
    if ('error' in result) {
      return res.status(result.status).json(result)
    }
    return res.status(201).json(result)
  }

  async updateUser(req: Request, res: Response) {
    const { body, params: { id } } = req

    const payload = body
    
    const updateSchema = yup.object().shape({
      name: yup.string(),
      nickname: yup.string(),
      email: yup.string().email(),
      password: yup.string(),
    })
    
    try {
      await updateSchema.validate(payload)

      const userUpdated = await this.service.update(id, payload)

      return res.status(200).json(userUpdated)
      
    } catch(err: any) {
      return res.status(400).json({ error: err.errors })
    }  
  }

  async deleteUser(req: Request, res: Response) {

    const { params: { id } } = req

    const result = await this.service.deleteUser(id) as any

    if(result?.error) {
      return res.status(result.status).json(result)
    }
    return res.status(200).json(result)
  }
}