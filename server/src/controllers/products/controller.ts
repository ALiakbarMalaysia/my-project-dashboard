import { Request, Response } from "express";
import asyncHandler from "../../helper/asyncHandler";
import routes from "../../routes/public";
import ProductService from "./service";

// Insert Products
routes.post(
  "/product",
  asyncHandler(async function createProduct(req: Request, res: Response) {
    const productData = req.body;
    const data = await ProductService.createProduct(productData);
    return res.json(data);
  })
  );
  
  // Get Products
  routes.get(
    "/getProduct",
    asyncHandler(async function getProduct(req:Request,res:Response) {
      const data = await ProductService.getAllProduct();
      return res.json(data)
    })
  )

