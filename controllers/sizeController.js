import Size from "../models/sizeModel.js";
import asyncHandler from "express-async-handler";

// @description : fetch all Sizes
// @route :  action --> GET /api/Sizes
// @access   Public
export const getSizes = asyncHandler(async (req, res) => {
 

    const sizes = await Size.find({})
    res.json({
      message: "all sizes",
      sizes
    })
});

// @description : fetch single Size by id
// @route :  action --> GET /api/Size/:id
// @access   Public
export const getSizeById = asyncHandler(async (req, res) => {
  const size = await Size.findById(req.params.id);
  size ? res.json({
        size
      })
    : res.status(404).json({
        status: res.statusCode,
        message: `size not found for id = ${req.params.id}`,
      });
});

// @description : delete single Size by id
// @route :  action --> DELETE /api/Sizes/:id
// @access   Private <ADMIN ONLY>
export const deleteSize = asyncHandler(async (req, res) => {
  const size = await Size.findById(req.params.id);

  if (size) {
    await Size.deleteOne(size);
    res.json({
      message: "Size deleted successfully",
    });
  } else {
    res.status(404).json({
      message: "Size not found"
    });
  }
});

// @description : create single size
// @route :  action --> POST /api/sizes
// @access   Private <ADMIN ONLY>
export const createSize = asyncHandler(async (req, res) => {

  const {size} = req.body;
  const sizeExist = await Size.findOne({ size });

  //check if Size already in database
  if (sizeExist) {
    res.status(400).json({
      message: "this size already exists",
    });
  } else {
    //create new Size to database
    const newSize = await Size.create({
      // user: req.user._id,
     size
    });

    //check if new Size is created
    if (newSize) {
      const createdSize = await newSize.save();
      res.status(201).json({
        message: "Size created successfully",
        size: createdSize,
      });
    } else {
      res.status(400).json({
        message: "Invalid size data",
      });
    }
  }
});

// @description : edit single Size by id
// @route :  action --> PUT /api/Sizes/:id
// @access   Private <ADMIN ONLY>
export const updateSize = asyncHandler(async (req, res) => {
  const {size} = req.body;

  const foundSize = await Size.findById(req.params.id);
 
  if (foundSize) {
    foundSize.size = size;
    const updatedSize = await foundSize.save();
    let updatedAt = new Date();
    res.json({
      message: "size updated successfully",
      _id: req.params.id,
      updatedSize: updatedSize,
      updatedAt: updatedAt.toString(),
    });
  } else {
    res.status(404).json({
      message: "size not found",
    });
  }
});


