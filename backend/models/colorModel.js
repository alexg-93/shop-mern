
import mongoose from 'mongoose'

const colorSchema = new mongoose.Schema({

    colorName:{
        type:String,
        required:true
    },
    colorHex:{
        type:String,
        required:true
    }
},{
    timestamp:true
})

const Color = mongoose.model('Color' ,colorSchema);

export default Color;