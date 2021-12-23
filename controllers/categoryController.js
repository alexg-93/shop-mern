import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";

// @description : fetch all categories
// @route :  action --> GET /api/category
// @access   Public
export const getCategories = asyncHandler(async (req, res) => {
 

    const categories = await Category.find({})
    res.json({
      message: "all categories",
      categories
    })
});

// @description : fetch single category by id
// @route :  action --> GET /api/category/:id
// @access   Public
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  category ? res.json({
    message: "category found",
    category
      })
    : res.status(404).json({
        status: res.statusCode,
        message: `category not found for id = ${req.params.id}`,
      });
});

// @description : delete single category by id
// @route :  action --> DELETE /api/category/:id
// @access   Private <ADMIN ONLY>
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await Category.deleteOne(category);
    res.json({
      message: "Category deleted successfully",
    });
  } else {
    res.status(404).json({
      message: "Category not found"
    });
  }
});

// @description : create single category
// @route :  action --> POST /api/category
// @access   Private <ADMIN ONLY>
export const createCategory = asyncHandler(async (req, res) => {

  const {
   department,
   categoryName,
  } = req.body;

  const categoryExist = await Category.findOne({ categoryName:categoryName.toLowerCase() , department:department.toLowerCase()});

  

  //check if category already in database
  if (categoryExist) {
    res.status(400).json({
      message: "this kind of category already exists",
    });
  } else {
    //create new category to database
    const newCategory = await Category.create({
      // user: req.user._id,
    department:department.toLowerCase(),
    categoryName:categoryName.toLowerCase(),
     
    });

    //check if new category is created
    if (newCategory) {
      const createdCategory = await newCategory.save();
      res.status(201).json({
        message: "new category created successfully",
        createdCategory,
      });
    } else {
      res.status(400).json({
        message: "Invalid category data",
      });
    }
  }
});

// @description : edit single category by id
// @route :  action --> PUT /api/category/:id
// @access   Private <ADMIN ONLY>
export const updateCategory = asyncHandler(async (req, res) => {
  const {
    categoryName
} = req.body;
  const category = await Category.findById(req.params.id);

  if (category) {
    category.categoryName = categoryName;
    const updatedCategory = await category.save();
    let updatedAt = new Date();
    res.json({
      message: "category updated successfully",
      _id: category._id,
      updatedCategory:updatedCategory,
      updatedAt: updatedAt.toString(),
    });
  } else {
    res.status(404).json({
      message: "category not found",
    });
  }
});


