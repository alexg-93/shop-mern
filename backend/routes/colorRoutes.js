import express from "express";
import {
  getColors,
  getColorById,
  deleteColor,
  createColor,
  updateColor,
} from "../controllers/colorController.js";

const router = express.Router();

// @description : fetch all colors
router.get("/", getColors);

// @description : create new color
router.post("/",createColor);

// @description : fetch single color by id
router.get("/:id", getColorById);

// @description : delete color by id
router.delete("/:id",deleteColor);


// @description : update color by id
router.put("/:id",updateColor);

export default router;
