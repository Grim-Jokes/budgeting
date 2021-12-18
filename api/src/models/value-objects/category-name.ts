export class CategoryName {
  constructor(public readonly value: string) {
      if (!this.value) {
          throw new Error("Category name must not be " + this.value);
      }
  }
}