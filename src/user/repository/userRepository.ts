import { UserProfileDTO } from "../interfaces.Dto/user-profile"
import { User } from "../entity/user"

export class UserRepository {

  constructor(private model: typeof User) {}

  async findByEmail(email: string) {
    return this.model.findOne({ email }).populate("photo");
  };

  async createUser(newUser: UserProfileDTO) {
    return this.model.create(newUser);
  };

  async updateUser(id: string, payload: UserProfileDTO) {
    return this.model.findByIdAndUpdate(id, payload, {new: true})
  };
  
  async deleteUser(id: string) {
    return this.model.findByIdAndDelete(id)
  };

  async findById(id: string) {
    return this.model.findById(id)
  };
}