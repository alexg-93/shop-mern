
import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    // Mens or Womens
    department:{
        type:String,
        required:true
    },
    // T-Shirts, Jeans, etc
    categoryName:{
        type:String,
        required:true
    },
  

},{
    timestamp:true
})

const Category = mongoose.model('Category' ,categorySchema);

export default Category;