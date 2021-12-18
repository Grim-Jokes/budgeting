import { Category } from "@src/models/entities/transaction/category";
import { ListCategoriesResponse } from "httptypes";

export function serializeListResponse(category: Category): ListCategoriesResponse {
  if (!category.id) {
    throw new Error("Attempting to serialize unsaved category");
  }

  return {
    id: category.id,
    name: category.name.value,
  }
}