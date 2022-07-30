import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

describe('Create category', () => {
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    const categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  it('Should be able to create a new course category', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Categoria Teste',
    });

    expect(category).toHaveProperty('id');
  });

  it('Should throw an error when creating a category with a name that already exists', async () => {
    await createCategoryUseCase.execute({
      name: 'teste',
    });

    await expect(
      createCategoryUseCase.execute({ name: 'teste' })
    ).rejects.toThrow('Category name already exists!');
  });
});
