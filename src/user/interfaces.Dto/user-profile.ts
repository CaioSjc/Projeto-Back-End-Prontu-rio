import { FilesProfileDTO } from "../../files/interfaces.Dto/files-profile";

export interface UserProfileDTO extends Document {
  name: string;
  nickname: string;
  email: string; 
  password: string;
  photo: FilesProfileDTO;
  patients: string[];
}