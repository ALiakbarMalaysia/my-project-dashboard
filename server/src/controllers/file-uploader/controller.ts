import { Request, Response } from "express";
import multer from "multer";
import asyncHandler from "../../helper/asyncHandler";
import routes from "../../routes/public";
import UploaderService from "./service";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/products");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

routes.post(
  "/products",
  asyncHandler(async function products(req: Request, res: Response) {
    const product = req.body;
    const result = UploaderService.createProduct(product);
    return res.json(product);
  })

)

routes.post("/uploadImage", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    message: "File uploaded seccessfully",
    filename: req.file.filename,
  });
  const imagePath = req.file.path;
  res.json({ imagePath });
});
