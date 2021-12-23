import Brand from "../models/brandModel.js";
import asyncHandler from "express-async-handler";

// @description : fetch all brands
// @route :  action --> GET /api/brands
// @access   Public
export const getBrands = asyncHandler(async (req, res) => {
 

    const brands = await Brand.find({})
    res.json({
      messasge: "all brands",
      brands
    })
});

// @description : fetch single brand by id
// @route :  action --> GET /api/brands/:id
// @access   Public
export const getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  brand ? res.json({
        brand
      })
    : res.status(404).json({
        status: res.statusCode,
        message: `brand not found for id = ${req.params.id}`,
      });
});

// @description : delete single brand by id
// @route :  action --> DELETE /api/brands/:id
// @access   Private <ADMIN ONLY>
export const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (brand) {
    await Brand.deleteOne(brand);
    res.json({
      message: "brand deleted successfully",
    });
  } else {
    res.status(404).json({
      message: "brand not found"
    });
  }
});

// @description : create single brand
// @route :  action --> POST /api/brands
// @access   Private <ADMIN ONLY>
export const createBrand = asyncHandler(async (req, res) => {
 
  const {
   brandName
  } = req.body;
  const brandExist = await Brand.findOne({ brandName });

  //check if brand already in database
  if (brandExist) {
    res.status(400).json({
      message: "this brand already exists",
    });
  } else {
    //create new brand to database
    const newBrand = await Brand.create({
      // user: req.user._id,
        brandName
     
    });

    //check if new brand is created
    if (newBrand) {
      const createdBrand = await newBrand.save();
      res.status(201).json({
        message: "new brand created successfully",
        brand: createdBrand,
      });
    } else {
      res.status(400).json({
        message: "Invalid brand data",
      });
    }
  }
});

// @description : edit single Brand by id
// @route :  action --> PUT /api/brands/:id
// @access   Private <ADMIN ONLY>
export const updateBrand = asyncHandler(async (req, res) => {
  const {
    brandName
} = req.body;
  const brand = await Brand.findById(req.params.id);

  if (brand) {
    brand.brandName = brandName;
    const updatedBrand = await brand.save();
    let updatedAt = new Date();
    res.json({
      message: "brand updated successfully",
      _id: brand._id,
      updatedBrand: updatedBrand,
      updatedAt: updatedAt.toString(),
    });
  } else {
    res.status(404).json({
      message: "brand not found",
    });
  }
});


