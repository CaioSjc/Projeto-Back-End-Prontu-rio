const { PatientRepository} = require('../../../patient/repository/patientRepository')
const { TimelinesService } = require('../timelinesService')
const { TimelinesRepository } = require('../../repository/timelinesRepository')
const { TimelinesPatientDTO} = require('../../interfaces.Dto/timelines-patient.Dto')

const repositoryPatients = new PatientRepository()
const timelineRepository = new TimelinesRepository()
const serviceTimelines = new TimelinesService(timelineRepository, repositoryPatients);

test('#TimelinesService.create deve ser capaz de criar uma timeline, atrelado ao paciente', async () => {
   
    const patientId = '12345';

    const payload: typeof TimelinesPatientDTO = {
      patientId,
    };
  
    const timelineCreated = {
      _id: '456',     
    };
 
    const patientFound = {
      _id: patientId,
      timelineId: [],
      save: jest.fn(), 
    };

    const spySave = jest.spyOn(patientFound, 'save')

   const spyTimeline = jest.spyOn(timelineRepository, 'createTimeline')

    timelineRepository.createTimeline = jest.fn().mockResolvedValue(timelineCreated);

    repositoryPatients.findById = jest.fn().mockResolvedValue(patientFound);

    const result = await serviceTimelines.create(payload);

    expect (timelineRepository.createTimeline).toHaveBeenCalledWith(payload);
    expect(repositoryPatients.findById).toHaveBeenCalledWith(patientId);
    expect(timelineRepository.createTimeline).toHaveBeenCalled();

    expect(patientFound.save).toHaveBeenCalled();

    expect(result).toEqual({
      status: 201,
      message: 'Successfully created timeline',
      data: timelineCreated,
    });
});

test('#TimelinesService.create deve ser capaz de retornar um erro, caso não consiga criar a timeline', async () => {
    
  const payload: typeof TimelinesPatientDTO = {
    patientId: '123',
   };

  timelineRepository.createTimeline = jest.fn().mockRejectedValue(new Error('Database connection failed'));

  const result = await serviceTimelines.create(payload);

  expect(result).toEqual({ error: true, status: 500, message: 'Internal server error', data: null });
});

test('#TimelinesService.findByTimeline deve ser capaz de buscar uma timeline', async () => {
    
  const timelineId = '12345';
  const foundData =  { "error": false,  "message": "Successfully found data", "status": 200, };
  
  timelineRepository.findByTimeline = jest.fn().mockResolvedValue(foundData);

  const result = await serviceTimelines.findByTimeline(timelineId);

  expect(timelineRepository.findByTimeline).toHaveBeenCalledWith(timelineId);

  expect(result).toEqual({
    error: false,
    status: 200, 
    message: "Successfully found data",
  });
});

test('#TimelinesService.findByTimeline deve ser capaz de retornar um erro, caso não consiga buscar uma timeline', async () => {
    
  const timelineId = '12345';
  
  const payload = {
    error: true, status: 500, message: 'Internal server error' 
  }

  timelineRepository.findByTimeline = jest.spyOn(timelineRepository, 'findByTimeline').mockReturnValue(payload)

  const result = await serviceTimelines.findByTimeline(timelineId);

  expect(timelineRepository.findByTimeline).toHaveBeenCalledWith(timelineId);

  expect(result).toEqual({ error: true, status: 500, message: 'Internal server error' });
});

test('#TimelineService.update deve ser capaz de atualizar uma timeline', async () => {
      
  const id = 'timelineId123';

  const payload: typeof TimelinesPatientDTO = {};
  
  const updatedTimeline = {};

  timelineRepository.updateTimeline = jest.fn().mockResolvedValue(updatedTimeline);

  const result = await serviceTimelines.updateTimeline(id, payload);

  expect(timelineRepository.updateTimeline).toHaveBeenCalledWith(id, payload);
  expect(result).toEqual(updatedTimeline);
});
  
test('#TimelineService.update deve ser capaz de retornar um erro, caso não consiga atualizar a timeline', async () => {
    
  const timelineId = 'timeline123';

  const payload: typeof TimelinesPatientDTO = {
    error: true, status: 500, message: 'Internal server error'
  };

  timelineRepository.updateTimeline = jest.spyOn(timelineRepository, 'updateTimeline').mockReturnValue(payload);

  const result = await serviceTimelines.updateTimeline(timelineId, payload);

  expect(timelineRepository.updateTimeline).toHaveBeenCalledWith(timelineId, payload);

  expect(result).toEqual({ error: true, status: 500, message: 'Internal server error' });
});

test('#TimelinesService.findAllTimelines deve ser capaz de buscar todas timelines', async () => {
   
  const timelines = 'all';

  const foundTimelines = [
    {},
    {},
  ];
  
  const expectedClientData = {
    status: 200,
    message: 'Successfully timelines found',
    data: foundTimelines,
  };

  timelineRepository.findAllTimelines = jest.fn().mockResolvedValue(foundTimelines);

  const result = await serviceTimelines.findAllTimelines(timelines);

  expect(timelineRepository.findAllTimelines).toHaveBeenCalledWith(timelines);

  expect(result).toEqual(expectedClientData);
});

test('#TimelinesService.findAllTimelines deve ser capaz de retornar um erro, caso não consiga buscar todas timelines', async () => {
    
  const timelines = 'all'; 

  timelineRepository.findAllTimelines = jest
  .fn()
  .mockRejectedValue(new Error('Database connection failed'));

  const result = await serviceTimelines.findAllTimelines(timelines);

  expect(timelineRepository.findAllTimelines).toHaveBeenCalledWith(timelines);

  expect(result).toStrictEqual({ error: true, status: 500, message: 'Internal server error' });
});