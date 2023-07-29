import { UserModule } from "../user/userModule";
import { AuthController } from "./controller/authController";
import { AuthService } from "./services/authService";

export class AuthModule {
  static build() {
    const service = new AuthService(UserModule.build().repository);
    const controller = new AuthController(service)
    
    return { controller, service }
  }
}