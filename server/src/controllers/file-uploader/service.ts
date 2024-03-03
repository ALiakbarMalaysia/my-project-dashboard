import { IProducts } from "interfaces/categories";
import { createProduct } from "../../bin/db";

class UploaderService {
  public static async createProduct(formData: IProducts) {
    const data = await createProduct(formData);
  }
}

export default UploaderService;
