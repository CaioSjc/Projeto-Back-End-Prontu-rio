import { UserRepository } from "../../user/repository/userRepository";
import { PatientProfileDTO } from "../interfaces.Dto/patient-profile"
import { PatientRepository } from "../repository/patientRepository"

export class PatientService {
  constructor(private repository: PatientRepository,
    private userRepository: UserRepository
    ) {}

  async create(payload: PatientProfileDTO) {    
     
    try {
      const { userId } = payload;

      const patientCreated = await this.repository.createPatient(payload)

      const userFound = await this.userRepository.findById(userId);
      userFound?.patients.push(patientCreated._id as any)
      userFound?.save();
      
      return { status: 201,  message: "Successfully created patient", data: patientCreated };

    } catch(error: any) {
      return { error: true, status: 500, message: "Internal server error", data: null }     
    }
  }
             
  async update(id: string, payload: PatientProfileDTO) {

    try {
      return this.repository.updatePatient(id, payload)

    } catch(error: any) {
      return { error: true, status: 500, message: "Internal server error" }
    }
  }

  async findByPatient(patientId: string) {
    try {
      return this.repository.findByPatient(patientId)

    } catch (error: any) {
      return { error: true, status: 500, message: "Internal server error" }
    }
  }    

  async findAllPatients(patients?: any)  {

    try {
      const { lt, gt } = patients;

      const filter =
        lt && gt
          ? { price: { $lt: parseFloat(lt), $gt: parseFloat(gt) } }
          : lt
          ? { price: { $lt: parseFloat(lt) } }
          : gt
          ? { price: { $gt: parseFloat(gt) } }
          : null;
  
      const patient = filter
        ? await this.repository.findAllPatients(filter)
        : await this.repository.findAllPatients();
  
      const page = parseInt(patients.page) || 1;
      const pageSize = parseInt(patients.pageSize) || 5;
  
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
  
      const patientPaginated = patient.slice(startIndex, endIndex);
      const patientsFound = await this.repository.findAllPatients(patients);

      return {
        status: 200,
        message: "Successfully patients found",
        data: patientPaginated, patientsFound,
        currentPage: page,
        totalPages: Math.ceil(patient.length / pageSize)       
      };

    } catch (error: any) {
      return { error: true, status: 500, message: "Internal server error" }
    }
  }
}