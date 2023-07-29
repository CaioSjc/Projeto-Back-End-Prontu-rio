import bcrypt from "bcrypt";

export class Crypt {

  static encrypt(data: string) {

    return bcrypt.hashSync(data, 8)
  }
}