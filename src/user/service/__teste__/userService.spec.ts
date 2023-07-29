const { UserService } = require('../userService')
const { UserRepository } = require('../../repository/userRepository')
const  { FilesRepository } = require('../../../files/repository/filesRepository')
const { Crypt } = require ('../../../utils/crypt')
const { FilesProfileDTO } = require ('../../../files/interfaces.Dto/files-profile')
const { UserProfileDTO } = require ('../../interfaces.Dto/user-profile')

const repository = new UserRepository()
const filesRepository = new FilesRepository()
const service = new UserService(repository, filesRepository);

test("#UserService.create deve ser capaz de criar um usuario", async () => {

  const mock = {_doc:{ name: 'Caio', nickname: 'Henrique', email: 'test@gmail.com', password: '12345'} }

  const file = {photo: 'teste575'}

  jest.spyOn(repository, 'findByEmail').mockReturnValue(null)
  jest.spyOn(repository, 'createUser').mockReturnValue(mock)
  jest.spyOn(filesRepository, 'createFile').mockReturnValue(file)
  jest.spyOn(Crypt, 'encrypt').mockReturnValue('12345')

  const result = await service.create(mock)

  expect(result.name).toBe('Caio')
  expect(result.nickname).toBe('Henrique')
  expect(result.email).toBe('test@gmail.com')
  expect(result.password).toBe('12345')

  expect(result.photo).toStrictEqual({photo:'teste575'})
})

test("#UserService.create deve ser capaz de retornar um erro, caso user existir", async () => {

  const mock = { email: 'test@gmail.com', password: '12345' }
  jest.spyOn(repository, 'findByEmail').mockReturnValue(mock)

  const result = await service.create(mock)

  expect(result).toStrictEqual({error: true, message: "User already exists", status: 400})
})

test("#UserService.Updated deve ser capaz de atualizar um usuario", async () => {

  const userId = {id: 'hhhh545454'}

  const payload:  typeof UserProfileDTO = {
     name: 'Caio', nickname: 'Henrique', email: 'test@gmail.com', password: '12345', photo: FilesProfileDTO, patients: [''] 
  }

  repository.updateUser = jest.fn().mockResolvedValue(payload);

  const result = await service.update(userId, payload)

  expect(repository.updateUser).toHaveBeenCalledWith(userId, payload);

  expect(result).toEqual(payload);  
});

test('#UserService.Updated deve ser capaz de retornar um erro, caso não atualize', async () => {
  
  const userId = '12345';

  const payload = {
     error: true, message: 'Internal server error', status: 500 
  }

  repository.updateUser = jest.spyOn(repository, 'updateUser').mockReturnValue(payload)

  const result = await service.update(userId, payload);

  expect(repository.updateUser).toHaveBeenCalledWith(userId, payload);

  expect(result).toStrictEqual({ error: true, message: 'Internal server error', status: 500 });
});

test('#UserService.delete deve ser capaz de deletar um usuario', async () => {
  
  const userId = '12345';

  repository.deleteUser = jest.fn().mockResolvedValue(true);

  const result = await service.deleteUser(userId);

  expect(repository.deleteUser).toHaveBeenCalledWith(userId);

  expect(result).toStrictEqual({
    message: 'Deleted User',
    status: 200,
    data: true,
  });
});

test('#UserService.delete deve ser capaz de retornar um erro, caso não deletar', async () => {
     
  const userId = '123';

  repository.deleteUser = jest.fn().mockRejectedValue(new Error('Database connection failed'));

  const result = await service.deleteUser(userId);

  expect(repository.deleteUser).toHaveBeenCalledWith(userId);

  expect(result).toEqual({
    error: true,
    message: 'Internal server error',
    status: 500,
  });
});