import { Category } from '../entities/Category';

interface ICreateCategoryDTO {
  name: string;
}

interface ICategoriesRepository {
  create({ name }: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category | undefined>;
}

export { ICreateCategoryDTO, ICategoriesRepository };
