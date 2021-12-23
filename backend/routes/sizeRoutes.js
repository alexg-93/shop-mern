import express from "express";
import {
  getSizes,
  getSizeById,
  deleteSize,
  createSize,
  updateSize,
} from "../controllers/sizeController.js";

const router = express.Router();

// @description : fetch all sizes
router.get("/", getSizes);

// @description : create new size
router.post("/",createSize);

// @description : fetch single size by id
router.get("/:id", getSizeById);

// @description : delete size by id
router.delete("/:id",deleteSize);


// @description : update size by id
router.put("/:id",updateSize);

export default router;
