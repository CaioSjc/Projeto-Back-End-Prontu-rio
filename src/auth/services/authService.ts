import JWT from "jsonwebtoken"
import { UserRepository } from "../../user/repository/userRepository";
import { AuthView } from "../views/authView";
import { ValidateUserDto } from "../interfaces.Dto/validate-user-dto";
import bcrypt from "bcrypt";

export class AuthService {
  
  constructor(private userRepository: UserRepository) {}

  async login(user: ValidateUserDto) {
  
    const userExists = await this.userRepository.findByEmail(user.email)

    if(!userExists) {
      return {
        error: true,
        message: 'Email/password is invalid',
        status: 400
      }
    }

    const passwordIsValid = bcrypt.compareSync(user.password, userExists.password)
   
    if(!passwordIsValid) {
      return {
        error: true,
        message: 'Email/password is invalid',
        status: 400
      }
    }

    const payload = { email: userExists.email, id: userExists.id }

    const secretKey = process.env.JWT_SECRET_KEY as string

    const options = { expiresIn: '1h' }

    const token = JWT.sign(payload, secretKey, options)

    const result = { user: userExists, token }

    return AuthView.toClient(result)
  }
}