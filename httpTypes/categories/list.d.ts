export interface ListCategoriesURIParams {
  categoryId?: number
}

export interface ListCategoriesResponse {
  id: number,
  name: string,
}

export interface RetrieveCategoryResponse extends ListCategoriesResponse {
  categories: RetrieveSubCategoryResponse[];
}

export interface RetrieveSubCategoryResponse extends ListCategoriesResponse {
  parentCategory: ListCategoriesResponse;
}