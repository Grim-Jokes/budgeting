import { CategoriesRepository } from "@src/models/repositories";

export class CategoriesService {
  constructor(
    private categoryRepo: CategoriesRepository
  ) { }

  async viewCategories() {
    return this.categoryRepo.list()
  }
}