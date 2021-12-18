import { PoolClient } from "pg";

import { CategoriesRepository, FilterCategoriesBy } from "../../models/repositories";

import { CategoryName } from "@src/models/value-objects";

import { Repository } from './repository';
import { Category } from "@src/models/entities/transaction/category";

interface CategoryDTO {
  id: number;
  categoryId: number | null;
  name: string;
}


export class Categories extends Repository<CategoryDTO> implements CategoriesRepository {

  private constructor(client: PoolClient) {
    super(client);
  }
  get(_id: number): Promise<Category> {
    throw new Error("Method not implemented.");
  }

  async update(_category: Category): Promise<Category> {
    throw new Error("Method not implemented.");
  }

  async save(category: Category): Promise<Category> {
    let categoryId: null | number = null;

    if (category.parentCategory) {
      // Cast to number for nbow
      // TODO: Determine if it's worth creating the parent first and then 
      // to create the child. 
      categoryId = (category.parentCategory.id as number);
    }

    const returnedId = await super.insertModel(`INSERT INTO category(
            "categoryId", name)
            VALUES ($1::integer,$2::text)
            RETURNING id;`, [
      categoryId,
      category.name.value
    ]);

    const newTransaction = new Category({
      name: category.name,
      parentCategory: category.parentCategory,
      id: returnedId
    })

    return newTransaction;
  }

  async list(filterBy?: FilterCategoriesBy): Promise<Category[]> {

    let categoryId: number | null = null;

    let query = `SELECT category.id, category."name"
    FROM 
        public.category
    WHERE 
      "categoryId" = $1::integer`;

    if (filterBy && filterBy.parentCategory && filterBy.parentCategory.id != null) {
      categoryId = filterBy.parentCategory.id
    } else {
      query = `${query} OR "categoryId" IS NULL`
    };

    const listResults = await this.listModels(query, [categoryId]);

    const transformedResults: Category[] = [];

    for (let i = 0; i < listResults.rowCount; i++) {
      const result = listResults.rows[i];
      transformedResults.push(new Category({
        id: result.id,
        name: new CategoryName(result.name),
      }));
    }

    return transformedResults;
  }
}