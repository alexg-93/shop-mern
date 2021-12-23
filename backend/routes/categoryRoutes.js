import express from "express";
import {
  getCategories,
  getCategoryById,
  deleteCategory,
  createCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// @description : fetch all Categories
router.get("/", getCategories);

// @description : create new Category
router.post("/",createCategory);

// @description : fetch single Category by id
router.get("/:id", getCategoryById);

// @description : delete Category by id
router.delete("/:id",deleteCategory);


// @description : update Category by id
router.put("/:id",updateCategory);

export default router;
