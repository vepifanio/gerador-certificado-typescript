import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './CreateUserUseCase';

describe('Create user', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    const usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Test',
      email: 'test@mail.com',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should throw a error when creating a user with a already existent email', async () => {
    await createUserUseCase.execute({
      name: 'Test',
      email: 'test@mail.com',
      password: '1234',
    });

    await expect(
      createUserUseCase.execute({
        name: 'Test',
        email: 'test@mail.com',
        password: '1234',
      })
    ).rejects.toThrow('Email is already in use');
  });
});
