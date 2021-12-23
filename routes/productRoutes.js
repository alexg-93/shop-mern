import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// @description : fetch all products
router.get("/", getProducts);

// @description : create new product
router.post("/",createProduct);

// @description : fetch single product by id
router.get("/:id", getProductById);

// @description : delete product by id
router.delete("/:id",deleteProduct);


// @description : update product by id
router.put("/:id",updateProduct);

export default router;
