import { UserController } from "./controller/userController";
import { User } from "./entity/user";
import { UserRepository } from "./repository/userRepository";
import { UserService } from "./service/userService";
import { FilesModule } from "../files/filesModule"

export class UserModule {
  static build() {
    const repository = new UserRepository(User)
    const service = new UserService(repository,  FilesModule.build().repository);
    const controller = new UserController(service)

    return { repository, service, controller }
  }
}