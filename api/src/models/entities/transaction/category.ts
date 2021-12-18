import { CategoryName } from "@src/models/value-objects";
import { Entity, EntityParams } from "../entity";

interface CategoryParams extends EntityParams {
  name: CategoryName;
  parentCategory?: Category;
  subCategories?: Category[];
}

export class Category extends Entity {
  public readonly name: CategoryName;
  public readonly parentCategory?: Category;
  public readonly subCategories: Category[] = [];

  constructor(params: CategoryParams) {
    super(params);

    this.name = params.name;
    this.parentCategory = params.parentCategory;
    if (params.subCategories) {
      this.subCategories = params.subCategories;
    }
  }
}