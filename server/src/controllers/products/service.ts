import { ProductsDTO } from "models/products";
import { createProduct, getAllProducts } from "../../bin/db";

class ProductService {
  public static async getAllProduct() {
    const getDataFromdb = await getAllProducts();
    if (getDataFromdb) {
      return getDataFromdb;
    }
    return null;
  }

  public static async createProduct(formData: ProductsDTO) {
    const createForm = await createProduct(formData)
    if (createForm) {
      return createForm
    } else {
      null
    }
  }
}

export default ProductService;
