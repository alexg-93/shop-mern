import Color from "../models/colorModel.js";
import asyncHandler from "express-async-handler";

// @description : fetch all colors
// @route :  action --> GET /api/colors
// @access   Public
export const getColors = asyncHandler(async (req, res) => {
 

    const colors = await Color.find({})
    res.json({
      message: "all colors",
      colors
    });

});

// @description : fetch single color by id
// @route :  action --> GET /api/color/:id
// @access   Public
export const getColorById = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  color
    ? res.json({
        color
      })
    : res.status(404).json({
        status: res.statusCode,
        message: `Color not found for id = ${req.params.id}`,
      });
});

// @description : delete single color by id
// @route :  action --> DELETE /api/colors/:id
// @access   Private <ADMIN ONLY>
export const deleteColor = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);

  if (color) {
    await Color.deleteOne(color);
    res.json({
      message: "Color deleted successfully",
    });
  } else {
    res.status(404).json({
      message: "Color not found"
    });
  }
});

// @description : create single color
// @route :  action --> POST /api/colors
// @access   Private <ADMIN ONLY>
export const createColor = asyncHandler(async (req, res) => {

  const {
   colorName,
   colorHex
  } = req.body;
  const colorExist = await Color.findOne({ colorName });

  //check if color already in database
  if (colorExist) {
    res.status(400).json({
      message: "this Color already exists",
    });
  } else {
    //create new color to database
    const newColor = await Color.create({
      // user: req.user._id,
      colorName,
      colorHex
    });

    //check if new color is created
    if (newColor) {
      const createdColor = await newColor.save();
      res.status(201).json({
        message: "Color created successfully",
        color: createdColor,
      });
    } else {
      res.status(400).json({
        message: "Invalid Color data",
      });
    }
  }
});

// @description : edit single color by id
// @route :  action --> PUT /api/colors/:id
// @access   Private <ADMIN ONLY>
export const updateColor = asyncHandler(async (req, res) => {
  const {
    colorName,
    colorHex

} = req.body;
  const color = await Color.findById(req.params.id);

  if (color) {
    color.colorName = colorName;
    color.colorHex = colorHex;
    const updatedColor = await color.save();
    let updatedAt = new Date();
    res.json({
      message: "color updated successfully",
      _id: color._id,
      updatedColor: updatedColor,
      updatedAt: updatedAt.toString(),
    });
  } else {
    res.status(404).json({
      message: "Color not found",
    });
  }
});


