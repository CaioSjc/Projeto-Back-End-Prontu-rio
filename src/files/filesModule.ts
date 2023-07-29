import { Files } from "./entity/files"
import { FilesRepository } from "./repository/filesRepository"

export class FilesModule {
  static build() {
    const repository = new FilesRepository(Files)
    return { repository }
  }
}