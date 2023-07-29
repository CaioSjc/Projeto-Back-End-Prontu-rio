const { AuthService  } = require('../authService')
const { UserRepository } = require('../../../user/repository/userRepository')
const { ValidateUserDto } = require ('../../interfaces.Dto/validate-user-dto')
import bcrypt from 'bcrypt';

const userRepository = new UserRepository()
const authservice = new AuthService(userRepository);

process.env.JWT_SECRET_KEY = 'mySecretKey';

jest.mock('bcrypt', () => ({
    compareSync: jest.fn((password, hashedPassword) => password === hashedPassword),
  })); 

test('#AuthService.login deve ser capaz de verificar se o usuario existe, e retornar um erro caso não exista', async () => {
  const user: typeof ValidateUserDto = {
    email: 'test@example.com',
    password: 'password123',
  };

  userRepository.findByEmail = jest.fn().mockResolvedValue(null);

  const result = await authservice.login(user);

  expect(userRepository.findByEmail).toHaveBeenCalledWith(user.email);

  expect(result).toEqual({
    error: true,
    message: 'Email/password is invalid',
    status: 400,
  });
});

test('#AuthService.login deve ser capaz de verificar se a senha do usuario informado esta correta, e retornar um erro caso a senha seja invalida', async () => {
  const user: typeof ValidateUserDto = {
    email: 'test@example.com',
    password: 'invalidpassword',
  };
  const existingUser = {
    email: 'test@example.com',
    password: 'hashedpassword123',
  };

  userRepository.findByEmail = jest.fn().mockResolvedValue(existingUser);

  const result = await authservice.login(user);

  expect(userRepository.findByEmail).toHaveBeenCalledWith(user.email);

  expect(bcrypt.compareSync).toHaveBeenCalledWith(user.password, existingUser.password);

  expect(result).toEqual({
    error: true,
    message: 'Email/password is invalid',
    status: 400,
  });
});