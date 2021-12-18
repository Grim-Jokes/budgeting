import { serializeListResponse } from "@src/app/serializers/categories";
import { CategoriesService } from "@src/app/services/categories";
import { Categories } from "@src/infra/repositories/categories";
import { NextFunction, Request, Response } from "express";


export async function ListCategories(_req: Request, res: Response, next: NextFunction) {
  try {
    const service = new CategoriesService(
      await Categories.getRepo()
    );

    const data = await service.viewCategories();
    res.status(200);
    res.send(
      JSON.stringify(
        data.map(serializeListResponse)
      )
    )
    next();
  } catch (err) {
    next(err);
  }
}

