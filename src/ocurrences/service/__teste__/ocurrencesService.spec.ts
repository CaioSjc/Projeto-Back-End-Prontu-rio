const { OcurrencesService } = require('../ocurrencesService')
const { OcurrencesRepository} = require('../../repository/ocurrencesRepositorie')
const { TimelinesRepository } = require('../../../timelines/repository/timelinesRepository')
const { OcurrencesDTO} = require('../../interfaces.Dto/ocurrence-profile')

const repositoryTimelines = new TimelinesRepository()
const ocurrencesRepository = new OcurrencesRepository()
const ocurrencesService = new OcurrencesService(ocurrencesRepository, repositoryTimelines);

test('#OcurrencesService.createOcurrence deve ser capaz de criar uma ocurrence atrelada a uma timeline', async () => {
    
  const ocurrenceId = 'ocurrence123';
  const payload: typeof OcurrencesDTO = {
    ocurrenceId,
  };
  const ocurrenceCreated = {
    _id: 'ocurrence456',
  };
  const timelineFound = {
    _id: ocurrenceId,
    ocurrenceId: [],
    save: jest.fn(), 
  };

  ocurrencesRepository.createOcurrence = jest.fn().mockResolvedValue(ocurrenceCreated);

  repositoryTimelines.findById = jest.fn().mockResolvedValue(timelineFound);

  const result = await ocurrencesService.createOcurrence(payload);

  expect(ocurrencesRepository.createOcurrence).toHaveBeenCalledWith(payload);

  expect(repositoryTimelines.findById).toHaveBeenCalledWith(ocurrenceId);

  expect(timelineFound.save).toHaveBeenCalled();

  expect(result).toEqual({
    status: 201,
    message: 'Successfully created Ocurrence',
    data: ocurrenceCreated,
  });
});

test('#OcurrencesService.createOcurrence deve ser capaz de retornar um erro, caso não consiga criar uma ocurrence', async () => {
  
  const ocurrenceId = 'ocurrence123';

  const payload: typeof OcurrencesDTO = {
    ocurrenceId,
  };

  ocurrencesRepository.createOcurrence = jest
    .fn()
    .mockRejectedValue(new Error('Database connection failed'));

  const result = await ocurrencesService.createOcurrence(payload);

  expect(result).toEqual({ error: true, status: 500, message: 'Internal server error', data: null });
});


test('#OcurrencesService.findByOcurrence deve ser capaz de buscar uma ocurrence', async () => {
   
  const timelineId = 'timeline123';

  const foundData = { "error": false, "message": "Successfully found data", "status": 200 }

  ocurrencesRepository.findByOcurrence = jest.fn().mockResolvedValue(foundData);

  const result = await ocurrencesService.findByOcurrence(timelineId);

  expect(ocurrencesRepository.findByOcurrence).toHaveBeenCalledWith(timelineId);

  expect(result).toEqual({
    error: false,
    status: 200,
    message: 'Successfully found data',
  });
});

test('#OcurrencesService.findByOcurrence deve ser capaz de retornar um erro, caso não consiga buscar uma ocurrence', async () => {
    
  const timelineId = 'timeline123';

  const payload = {
    error: true, status: 500, message: 'Internal server error', data: null
  }

  ocurrencesRepository.findByOcurrence = jest.spyOn(ocurrencesRepository, 'findByOcurrence').mockReturnValue(payload);

  const result = await ocurrencesService.findByOcurrence(timelineId);

  expect(ocurrencesRepository.findByOcurrence).toHaveBeenCalledWith(timelineId);

  expect(result).toStrictEqual({ error: true, status: 500, message: 'Internal server error', data: null });
});

test('#OcurrencesService.updatedOcurrence deve ser capaz de atualizar uma ocurrence', async () => {
   
  const ocurrenceId = 'ocurrence123';

  const payload: typeof OcurrencesDTO = {

  };
  const updatedOcurrences = {
   
  };

  ocurrencesRepository.updatedOcurrence = jest.fn().mockResolvedValue(updatedOcurrences);

  const result = await ocurrencesService.updatedOcurrence(ocurrenceId, payload);

  expect(ocurrencesRepository.updatedOcurrence).toHaveBeenCalledWith(ocurrenceId, payload);

  expect(result).toEqual(updatedOcurrences);
});

test('#OcurrencesService.updatedOcurrence deve ser capaz de retornar um erro, caso a ocurrence não atualize', async () => {
   
  const ocurrenceId = '12345';

  const payload = {
    error: true, status: 500, message: 'Internal server error'
  }

  ocurrencesRepository.updatedOcurrence = jest.spyOn(ocurrencesRepository, 'updatedOcurrence').mockReturnValue(payload)

  const result = await ocurrencesService.updatedOcurrence(ocurrenceId, payload);

  expect(ocurrencesRepository.updatedOcurrence).toHaveBeenCalledWith(ocurrenceId, payload);

  expect(result).toEqual({ error: true, status: 500, message: 'Internal server error' });
});

test('#OcurrencesService.findAllOcurrences deve ser capaz de buscar todas as ocurrences', async () => {
  
  const ocurrences = 'all';

  const foundOcurrences = [
    {},
    {},
  ];
  const expectedClientData = {
    status: 200,
    message: 'Successfully ocurrences found',
    data: foundOcurrences,
  };

  ocurrencesRepository.findAllOcurrences = jest.fn().mockResolvedValue(foundOcurrences);

  const result = await ocurrencesService.findAllOcurrences(ocurrences);

  expect(ocurrencesRepository.findAllOcurrences).toHaveBeenCalledWith(ocurrences);

  expect(result).toEqual(expectedClientData);
});

test('#OcurrencesService.findAllOcurrences deve ser capaz de retornar um erro, caso não consiga buscar todas ocurrences', async () => {

  const ocurrences = 'all';

  ocurrencesRepository.findAllOcurrences = jest
    .fn()
    .mockRejectedValue(new Error('Database connection failed'));

  const result = await ocurrencesService.findAllOcurrences(ocurrences);

  expect(ocurrencesRepository.findAllOcurrences).toHaveBeenCalledWith(ocurrences);

  expect(result).toEqual({ error: true, status: 500, message: 'Internal server error' });
});