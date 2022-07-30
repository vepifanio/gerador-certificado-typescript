import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name }: IRequest): Promise<Category> {
    const isAnExistentName = await this.categoriesRepository.findByName(name);

    if (isAnExistentName) {
      throw new Error('Category name already exists!');
    }

    const category = await this.categoriesRepository.create({ name });

    return category;
  }
}

export { CreateCategoryUseCase };
