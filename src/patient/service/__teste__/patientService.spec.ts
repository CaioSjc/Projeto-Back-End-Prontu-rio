const { PatientService } = require('../patientService')
const { PatientRepository} = require('../../repository/patientRepository')
const { UserRepository } = require('../../../user/repository/userRepository')
const { PatientProfileDTO} = require('../../interfaces.Dto/patient-profile')

const repositoryUser = new UserRepository()
const repositoryPatient = new PatientRepository()
const servicePatient = new PatientService(repositoryPatient, repositoryUser);

test('#PatientService.create deve ser capaz de criar um paciente, atrelado ao usuario', async () => {
    
    const userId = '12345';

    const payload: typeof PatientProfileDTO = {
      userId,
    };

    const patientCreated = {
      _id: '456',
    };

    const userFound = {
      _id: userId,
      patients: [],
      save: jest.fn(),
    };

    repositoryPatient.createPatient = jest.fn().mockResolvedValue(patientCreated);

    repositoryUser.findById = jest.fn().mockResolvedValue(userFound);

    const result = await servicePatient.create(payload);

    expect(repositoryPatient.createPatient).toHaveBeenCalledWith(payload);

    expect(repositoryUser.findById).toHaveBeenCalledWith(userId);

    expect(userFound.save).toHaveBeenCalled();

    expect(result).toEqual({
      status: 201,
      message: 'Successfully created patient',
      data: patientCreated,
    });
});

test('#PatientService.create deve ser capaz de retornar um erro, caso não consiga criar o paciente', async () => {
    
  const payload: typeof PatientProfileDTO = {
    userId: '12345',
  };

  repositoryPatient.createPatient = jest
    .fn()
    .mockRejectedValue(new Error('Database connection failed'));

  const result = await servicePatient.create(payload);

  expect(result).toEqual({
    error: true,
    status: 500,
    message: 'Internal server error',
    data: null,
  });
});

test('#PatientService.update deve ser capaz de atualizar um paciente', async () => {
 
  const id = '12345';

  const payload: typeof PatientProfileDTO = {
  };

  const updatedPatient = {
  };

  repositoryPatient.updatePatient = jest.fn().mockResolvedValue(updatedPatient);

  const result = await servicePatient.update(id, payload);

  expect(repositoryPatient.updatePatient).toHaveBeenCalledWith(id, payload);

  expect(result).toEqual(updatedPatient);
});

test('#PatientService.update deve ser capaz de retornar um erro, caso o paciente não atualize', async () => {
  
  const id = '12345';

  const payload = {
    error: true, status: 500, message: 'Internal server error'
  }

  repositoryPatient.updatePatient = jest.spyOn(repositoryPatient, 'updatePatient').mockReturnValue(payload)

  const result = await servicePatient.update(id, payload);

  expect(repositoryPatient.updatePatient).toHaveBeenCalledWith(id, payload);

  expect(result).toEqual({ error: true, status: 500, message: 'Internal server error' });
});

test('#PatientService.findByPatient deve ser capaz de buscar um paciente', async () => {
 
  const patientId = '12345';

  const foundData = {
  };

  repositoryPatient.findByPatient = jest.fn().mockResolvedValue(foundData);

  const result = await servicePatient.findByPatient(patientId);

  expect(repositoryPatient.findByPatient).toHaveBeenCalledWith(patientId);

  expect(result).toEqual(foundData);
});

test('#PatientService.findByPatient deve ser capaz de retornar um erro, caso não consiga buscar um paciente', async () => {
 
  const patientId = '12345';

  const payload = {
    error: true, status: 500, message: 'Internal server error' 
  }

  repositoryPatient.findByPatient = jest.spyOn(repositoryPatient, 'findByPatient').mockReturnValue(payload)

  const result = await servicePatient.findByPatient(patientId);

  expect(repositoryPatient.findByPatient).toHaveBeenCalledWith(patientId);

  expect(result).toEqual({ error: true, status: 500, message: 'Internal server error' });
});

test('#PatientService.findAllPatients deve ser capaz de buscar todos os pacientes paginados', async () => {
  const patients = {
    lt: '100',
    gt: '50',
    page: '2',
    pageSize: '5',
  };

  const patientsFound = [
  ];

  const filteredPatients = [
  ];

  repositoryPatient.findAllPatients = jest.fn().mockResolvedValue(patientsFound);

  repositoryPatient.findAllPatients = jest.fn().mockResolvedValue(filteredPatients);

  const result = await servicePatient.findAllPatients(patients);

  expect(repositoryPatient.findAllPatients).toHaveBeenCalledWith({
    price: { $lt: 100, $gt: 50 },
  });

  expect(result).toStrictEqual({
    message: 'Successfully patients found',
    status: 200,
    currentPage: 2,
    totalPages: Math.ceil(filteredPatients.length / 5),
    data: filteredPatients, patientsFound  
  });
});

test('#PatientService.findAllPatients deve ser capaz de retornar um erro, caso não consiga buscar todos os pacientes', async () => {

    repositoryPatient.findAllPatients = jest.fn().mockRejectedValue(new Error('Database error'));

    const result = await servicePatient.findAllPatients();

    expect(result).toEqual({
      error: true,
      status: 500,
      message: 'Internal server error',
    });
});

