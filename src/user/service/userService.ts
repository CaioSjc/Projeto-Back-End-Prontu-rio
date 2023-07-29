import { UserProfileDTO } from "../interfaces.Dto/user-profile"
import { Crypt } from "../../utils/crypt"
import { UserRepository } from "../repository/userRepository"
import { FilesRepository} from "../../files/repository/filesRepository"

export class UserService {
  constructor(private repository: UserRepository,
    private filesRepository: FilesRepository
    ) {}

  async create(payload: UserProfileDTO ) {
    
    const userAlreadyExists = await this.repository.findByEmail(payload.email)

    if (userAlreadyExists) {
      return {
        error: true,
        message: 'User already exists',
        status: 400
      }
    }

    const photo = await this.filesRepository.createFile(payload.photo)

    const userToPersist = {
      ...payload,
      password: Crypt.encrypt(payload.password),
      photo: photo.id
    }
   
    const result = await this.repository.createUser(userToPersist)
    return { ...(result as any)._doc, photo }
  }

  async update(id: string, payload: UserProfileDTO) {
    try {
      return this.repository.updateUser(id, payload)

    } catch(error) {
      return { error: true, message: "Internal server error", status: 500 }
    }
  }

  async deleteUser(id: string) {
    
    try {
      const userDeleted = await this.repository.deleteUser(id)
      return { message: "Deleted User", status: 200, data: userDeleted }

    } catch(error: any) {
      return { error: true, message: "Internal server error", status: 500 }
    }
  }
}
