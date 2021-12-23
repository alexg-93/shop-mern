import mongoose from "mongoose";
import Color from './colorModel.js'
import Size from './sizeModel.js'
import Category from './categoryModel.js'
import Brand from './brandModel.js'

const productSchema = new mongoose.Schema(
  {
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:'User'
    // },

    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    colors: [
      {
        type:Object,
        color: Color
      },
    ],
    sizes: [
      {
        type:Object,
        size: Size
      },
    ],
    brand: {
      type:Object,
      required: true,
      brand: Brand
    },
    categories: [
      
      { 
        type:Object,
        category: Category
     }
      ],
  },
  {
    timestamp: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
