import express from "express";
import {
  getBrands,
  getBrandById,
  deleteBrand,
  createBrand,
  updateBrand,
} from "../controllers/brandController.js";


const router = express.Router();

// @description : fetch all brands
router.get("/", getBrands);

// @description : create new brand
router.post("/",createBrand);

// @description : fetch single brand
router.get("/:id", getBrandById);

// @description : delete brand by id
router.delete("/:id",deleteBrand);


// @description : update brand by id
router.put("/:id",updateBrand);

export default router;
