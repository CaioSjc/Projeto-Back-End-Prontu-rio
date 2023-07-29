import { Files } from "../entity/files";
import { FilesProfileDTO } from "../interfaces.Dto/files-profile";

export class FilesRepository {
  constructor(private model: typeof Files) {}

  async createFile(file: FilesProfileDTO) {
    return this.model.create(file);
  }
}